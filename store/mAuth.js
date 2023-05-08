import {generateCodeVerifier} from "@/assets/auth/pkce"
import {parseToken} from "@/assets/auth/common"
import {
  delCookieTokens,
  getCookieCodeVerifier,
  getCookieSocial,
  getCookieTokens,
  setCookieCodeVerifierAndSocial,
  setCookieTokens
} from '@/assets/auth/cookies'
import {getJwt, getLoginUrl, logout, refreshJwt, setParams} from '@/assets/auth/keycloak'

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
  setSocial: (state, social) => {
    if (social) {
      state.social = social
    }
  },
  setTokens: (state, data) => {
    state.accessToken = data.access_token
    state.refreshToken = data.refresh_token
    state.metadata = {authorization: `Bearer ${data.access_token}`}
    state.tokenInfo = parseToken(data.access_token)
    setCookieTokens(data)
  },
  setLoggedOff: (state, delCookies) => {
    state.accessToken = null
    state.refreshToken = null
    state.metadata = null
    state.tokenInfo = null
    if (delCookies) {
      delCookieTokens()
    }
  },
}

export const actions = {
  checkRefreshToken({commit}) {
    const {refreshToken} = getCookieTokens()
    if (!refreshToken) {
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
          await dispatch('getJwt', {location, code})
        }
      }
    }
  },
  async setCodeVerifier({}, {location, social}) {
    const codeVerifier = generateCodeVerifier()
    setCookieCodeVerifierAndSocial({codeVerifier, social})
    window.location.href = await getLoginUrl({location, codeVerifier, social})
  },
  async getJwt({commit}, {location, code}) {
    const codeVerifier = getCookieCodeVerifier()
    if (!codeVerifier) {
      console.error('cookie CODE_VERIFIER is not set')
      return
    }
    try {
      const {data} = await getJwt({location, codeVerifier, code})
      commit('setTokens', data)
    } catch (err) {
      commit('setLoggedOff', true)
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
    if (!refreshToken) {
      commit('setLoggedOff')
      return false
    }
    try {
      const {data} = await refreshJwt(refreshToken)
      commit('setTokens', data)
      return true
    } catch (err) {
      console.error(err)
      commit('setLoggedOff', true)
      return false
    }
  },
  async logout({commit}) {
    const {refreshToken} = getCookieTokens()
    if (!refreshToken) {
      commit('setLoggedOff')
      return
    }
    try {
      await logout(refreshToken)
    } catch (err) {
      console.error(err)
    }
    commit('setLoggedOff', true)
  },
}
