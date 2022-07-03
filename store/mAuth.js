import axios from "axios";
import {generateCodeChallengeFromVerifier, generateCodeVerifier} from "assets/funcs/pkce";
import {generateUUID} from "assets/funcs/uuid";
import {getParams, getUri} from "assets/funcs/common";

const KC_IDP_HINT = 'kc_idp_hint'
const CODE_VERIFIER = 'code_verifier'
const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token' //also grant_type
const AUTHORIZATION_CODE = 'authorization_code'

const keycloakUrl = 'http://localhost:8081'
const realm = 'find-psy'
const client = 'manager'
const clientSecret = 'MEsxZND0uTmkhVJzmU3tcQDPWzwVflmk'

export const state = () => ({
  kcIdpHint: null,
  loggedIn: false,
  loginUrl: null,
  accessToken: null,
  accessTokenParsed: {},
  refreshToken: null,
})

export const getters = {
  kcIdpHint: state => state.kcIdpHint,
  loggedIn: state => state.loggedIn,
  accessToken: state => state.accessToken,
  accessTokenParsed: state => state.accessTokenParsed,
  refreshToken: state => state.refreshToken,
  loginUrl: state => state.loginUrl,
}

export const mutations = {
  setKcIdpHint: (state, kcIdpHint) => state.kcIdpHint = kcIdpHint,
  setLoggedIn: (state, loggedIn) => state.loggedIn = loggedIn,
  setTokens: (state, {accessToken, refreshToken}) => {
    state.loggedIn = true
    state.accessToken = accessToken
    state.accessTokenParsed = parseToken(accessToken)
    state.refreshToken = refreshToken
  },
  setLoggedOff: (state) => {
    state.loggedIn = false
    state.accessToken = null
    state.accessTokenParsed = {}
    state.refreshToken = null
  },
  setLoginUrl: (state, loginUrl) => state.loginUrl = loginUrl,
}

function getString(params) {
  return Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')
}

function parseToken(token) {
  let base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

function getKeycloakUrl(route) {
  return `${keycloakUrl}/auth/realms/${realm}/protocol/openid-connect/${route}`
}

export async function getLoginUrl(redirectUrl, socialNet, codeVerifier) {
  let state = generateUUID()
  let nonce = generateUUID()
  let codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier)
  let url = getKeycloakUrl('auth')
  return `${url}?client_id=${client}&redirect_uri=${redirectUrl}&state=${state}&response_mode=fragment&response_type=code&scope=openid&nonce=${nonce}&code_challenge=${codeChallenge}&code_challenge_method=S256&kc_idp_hint=${socialNet}`
}

export const actions = {
  async getKcIdpHint({commit}) {
    let kcIdpHint = this.$cookies.get(KC_IDP_HINT)
    commit('setKcIdpHint', kcIdpHint)
  },
  async setCookies({}, data) {
    this.$cookies.set(ACCESS_TOKEN, data.access_token, {maxAge: data.expires_in})
    this.$cookies.set(REFRESH_TOKEN, data.refresh_token, {maxAge: data.refresh_expires_in})
  },
  async delCookies({}) {
    this.$cookies.remove(ACCESS_TOKEN)
    this.$cookies.remove(REFRESH_TOKEN)
  },
  async mounted({state, dispatch}){
    await dispatch('getTokens')
    let pathnameSearch = `${location.pathname}${location.search}`
    if (state.loggedIn) {
      await this.$router.push(pathnameSearch)
    } else {
      let params = getParams(location.hash)
      await this.$router.push(pathnameSearch)
      if (params.code) {
        await dispatch('getJwt', {
          code: params.code,
          redirectUri: getUri(location),
        })
      }
    }
  },
  async checkRefreshToken({commit}) {
    let refreshToken = this.$cookies.get(REFRESH_TOKEN)
    if (!refreshToken) {
      commit('setLoggedOff')
    }
  },
  async getTokens({commit, dispatch}) {
    let accessToken = this.$cookies.get(ACCESS_TOKEN)
    let refreshToken = this.$cookies.get(REFRESH_TOKEN)
    if (accessToken) {
      commit('setTokens', {accessToken, refreshToken})
      return
    }
    if (refreshToken) {
      dispatch('refreshJwt', refreshToken)
      return
    }
    commit('setLoggedOff')
  },
  async refreshJwt({commit, dispatch}, refreshToken) {
    if (!refreshToken) {
      refreshToken = this.$cookies.get(REFRESH_TOKEN)
    }
    if (!refreshToken) {
      console.warn(`cookie ${REFRESH_TOKEN} is not set`)
      commit('setLoggedOff')
      return
    }
    try {
      let {data} = await axios({
        url: getKeycloakUrl('token'),
        method: 'POST',
        data: getString({
          grant_type: REFRESH_TOKEN,
          client_id: client,
          client_secret: clientSecret,
          refresh_token: refreshToken,
        }),
        headers: {'content-type': 'application/x-www-form-urlencoded'},
      })
      commit('setTokens', {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      })
      dispatch('setCookies', data)
    } catch (err) {
      commit('setLoggedIn', false)
      console.error(err)
    }
  },
  async setCodeVerifier({state, commit}, {redirectUri, socialNet}) {
    this.$cookies.set(KC_IDP_HINT, socialNet, {
      maxAge: 2592000,
    })
    let codeVerifier = generateCodeVerifier()
    let loginUrl = await getLoginUrl(redirectUri, socialNet, codeVerifier)
    console.log(loginUrl)
    commit('setLoginUrl', loginUrl)
    this.$cookies.set(CODE_VERIFIER, codeVerifier, {
      maxAge: 60,
      sameSite: true,
    })
  },
  async getJwt({commit, dispatch}, {code, redirectUri}) {
    let codeVerifier = this.$cookies.get(CODE_VERIFIER)
    this.$cookies.remove(CODE_VERIFIER)
    if (!codeVerifier) {
      console.warn(`cookie ${CODE_VERIFIER} is not set`)
      return
    }
    try {
      let {data} = await axios({
        url: getKeycloakUrl('token'),
        method: 'POST',
        data: getString({
          code: code,
          grant_type: AUTHORIZATION_CODE,
          client_id: client,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
        headers: {'content-type': 'application/x-www-form-urlencoded'},
      })
      commit('setTokens', {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      })
      dispatch('setCookies', data)
    } catch (err) {
      commit('setLoggedOff')
      console.error(err)
    }
  },
  async logout({commit, dispatch}) {
    let refreshToken = this.$cookies.get(REFRESH_TOKEN)
    if (!refreshToken) {
      console.log(`cookie ${REFRESH_TOKEN} is not set`)
      commit('setLoggedOff')
      return
    }
    try {
      let {data} = await axios({
        url: getKeycloakUrl('logout'),
        method: 'POST',
        data: getString({
          client_id: client,
          client_secret: clientSecret,
          refresh_token: refreshToken,
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      commit('setLoggedOff')
      dispatch('delCookies')
      return data
    } catch (err) {
      console.error(err)
    }
  },
}
