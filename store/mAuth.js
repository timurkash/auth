import {generateCodeVerifier} from "@/assets/auth/pkce"
import {parseToken} from "@/assets/auth/common"
import {
  delCookieTokens,
  getCookieCodeVerifier,
  getCookieSocial,
  getCookieRefreshToken,
  getCookieTokens,
  setCookieCodeVerifierAndSocial,
  setCookieTokens
} from '@/assets/auth/cookies'
import {getJwt, getLoginUrl, logout, refreshJwt, setParams} from '@/assets/auth/keycloak'

function getUri(location) {
  return `${location.protocol}//${location.host}${location.pathname}${location.search}`
}

export const state = () => ({
  social: null,
  accessToken: null,
  refreshToken: null,
  metadata: null,
  tokenInfo: null,
})

export const getters = {
  social: state => state.social,
  accessToken: state => state.accessToken,
  refreshToken: state => state.refreshToken,
  tokenInfo: state => state.tokenInfo,
}

export const mutations = {
  setSocial: (state, social) => state.kcIdpHint = social,
  setTokens: (state, data) => {
    state.accessToken = data.access_token
    state.metadata = {authorization: `Bearer ${data.access_token}`}
    state.tokenInfo = parseToken(data.access_token)
    state.refreshToken = data.refresh_token
  },
  setLoggedOff: (state) => {
    state.accessToken = null
    state.refreshToken = null
    state.metadata = null
    state.tokenInfo = null
  },
}

export const actions = {
  async checkRefreshToken({commit}) {
    if (!getCookieRefreshToken()) {
      commit('setLoggedOff')
    }
  },
  async mounted({state, commit, dispatch}) {
    setParams({
      url: this.$env.KEYCLOAK_URL,
      client: this.$env.KEYCLOAK_CLIENT,
      clientSecret: this.$env.KEYCLOAK_CLIENT_SECRET,
    })
    commit('setSocial', getCookieSocial())
    setInterval(() => dispatch('checkRefreshToken'), 60000)
    const logged = await dispatch('refreshToken')
    if (!logged) {
      const pathnameSearch = `${location.pathname}${location.search}`
      if (state.accessToken) {
        await this.$router.push(pathnameSearch)
      } else {
        const code = new URLSearchParams(location.hash.substring(1)).get("code")
        await this.$router.push(pathnameSearch)
        if (code) {
          await dispatch('getJwt', {
            redirectUri: getUri(location),
            code: code,
          })
        }
      }
    }
  },
  async setCodeVerifier({}, {location, social}) {
    const redirectUri = getUri(location)
    const codeVerifier = generateCodeVerifier()
    setCookieCodeVerifierAndSocial({codeVerifier, social})
    window.location.href = await getLoginUrl(redirectUri, codeVerifier, social)
  },
  async getJwt({commit}, {redirectUri, code}) {
    const codeVerifier = getCookieCodeVerifier()
    if (!codeVerifier) {
      console.error('cookie CODE_VERIFIER is not set')
      return
    }
    try {
      const {data} = await getJwt(redirectUri, codeVerifier, code)
      commit('setTokens', data)
      setCookieTokens(data)
    } catch (err) {
      commit('setLoggedOff')
    }
  },
  async refreshToken({commit}, force) {
    const {accessToken, refreshToken} = getCookieTokens()
    if (!force && accessToken) {
      commit('setTokens', {
        access_token: accessToken,
        refresh_token: refreshToken,
      })
      return true
    }
    if (refreshToken) {
      try {
        const {data} = await refreshJwt(refreshToken)
        commit('setTokens', data)
        setCookieTokens(data)
        return true
      } catch (err) {
        console.error(err)
      }
    }
    commit('setLoggedOff')
    return false
  },
  async logout({commit}) {
    const refreshToken = getCookieRefreshToken()
    if (refreshToken) {
      try {
        await logout(refreshToken)
      } catch (err) {
        console.error(err)
      } finally {
        commit('setLoggedOff')
        delCookieTokens()
      }
    } else {
      commit('setLoggedOff')
    }
  },
}
