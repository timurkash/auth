import {generateCodeVerifier} from "@/assets/auth/pkce"
import {getUri, parseToken} from "@/assets/auth/common"
import {
  delCookieTokens,
  getCookieCodeVerifier,
  getCookieKcIdpHint,
  getCookieRefreshToken,
  getCookieTokens,
  setCookieCodeVerifierAndKcIdpHint,
  setCookieTokens
} from '@/assets/auth/cookies'
import {getJwt, getLoginUrl, logout, refreshJwt, setParams} from '@/assets/auth/keycloak'

export const state = () => ({
  kcIdpHint: null,
  accessToken: null,
  refreshToken: null,
  metadata: null,
  tokenInfo: null,
})

export const getters = {
  kcIdpHint: state => state.kcIdpHint,
  accessToken: state => state.accessToken,
  refreshToken: state => state.refreshToken,
  // metadata: state => state.metadata,
  tokenInfo: state => state.tokenInfo,
}

export const mutations = {
  setKcIdpHint: (state, kcIdpHint) => state.kcIdpHint = kcIdpHint,
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
    commit('setKcIdpHint', getCookieKcIdpHint())
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
  async setCodeVerifier({}, {redirectUri, social}) {
    let codeVerifier = generateCodeVerifier()
    setCookieCodeVerifierAndKcIdpHint(codeVerifier, social)
    return await getLoginUrl(redirectUri, codeVerifier, social)
  },
  async getJwt({commit}, {redirectUri, code}) {
    const codeVerifier = getCookieCodeVerifier()
    if (!codeVerifier) {
      console.error('cookie CODE_VERIFIER is not set')
      return
    }
    try {
      const data = await getJwt(redirectUri, codeVerifier, code)
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
        const data = await refreshJwt(refreshToken)
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
