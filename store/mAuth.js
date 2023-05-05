import {generateCodeVerifier} from "@/assets/auth/pkce";
import {getParams, getUri, parseToken} from "@/assets/auth/common";
import {
  setTokens, getRefreshToken, delTokens,
  setKcIdpHint, getKcIdpHint,
  setCodeVerifier, getCodeVerifier, getTokens
} from '@/assets/auth/cookies'
import {setParams, getLoginUrl, getJwt, logout, refreshJwt} from '@/assets/auth/keycloak'

export const state = () => ({
  kcIdpHint: null,
  loginUrl: null,
  accessToken: null,
  metadata: null,
  tokenInfo: null,
  refreshToken: null,
})

export const getters = {
  kcIdpHint: state => state.kcIdpHint,
  loginUrl: state => state.loginUrl,
  accessToken: state => state.accessToken,
  // metadata: state => state.metadata,
  tokenInfo: state => state.tokenInfo,
  refreshToken: state => state.refreshToken,
}

export const mutations = {
  setKcIdpHint: (state, kcIdpHint) => state.kcIdpHint = kcIdpHint,
  setLoginUrl: (state, loginUrl) => state.loginUrl = loginUrl,
  setTokens: (state, data) => {
    state.accessToken = data.access_token
    state.metadata = {authorization: `Bearer ${data.access_token}`}
    state.tokenInfo = parseToken(data.access_token)
    state.refreshToken = data.refresh_token
  },
  setLoggedOff: (state) => {
    state.accessToken = null
    state.metadata = null
    state.tokenInfo = null
    state.refreshToken = null
  },
}

export const actions = {
  checkRefreshToken({commit}) {
    if (!getRefreshToken(this.$cookies)) {
      commit('setLoggedOff')
    }
  },
  async mounted({state, commit, dispatch}, params){
    setParams(params)
    commit('setKcIdpHint', getKcIdpHint(this.$cookies))
    setInterval(() => dispatch('checkRefreshToken'), 60000);
    const logged = await dispatch('refreshToken')
    if (!logged) {
      const pathnameSearch = `${location.pathname}${location.search}`
      if (state.accessToken) {
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
    }
  },
  async setCodeVerifier({state, commit}, {redirectUri, social}) {
    setKcIdpHint(this.$cookies, social)
    let codeVerifier = generateCodeVerifier()
    let loginUrl = await getLoginUrl(redirectUri, social, codeVerifier)
    commit('setLoginUrl', loginUrl)
    setCodeVerifier(this.$cookies, codeVerifier)
  },
  async getJwt({commit, dispatch}, {code, redirectUri}) {
    const codeVerifier = getCodeVerifier(this.$cookies)
    if (!codeVerifier) {
      console.error('cookie CODE_VERIFIER is not set')
      return
    }
    try {
      const data = await getJwt(code, redirectUri, codeVerifier)
      commit('setTokens', data)
      setTokens(this.$cookies, data)
    } catch (err) {
      commit('setLoggedOff')
      console.error(err)
    }
  },
  async logout({commit}) {
    const refreshToken = getRefreshToken(this.$cookies)
    if (refreshToken) {
      try {
        await logout(refreshToken)
      } catch (err) {
        console.error(err)
      } finally {
        commit('setLoggedOff')
        delTokens(this.$cookies)
      }
    } else {
      commit('setLoggedOff')
    }
  },
  async refreshToken({commit}, force) {
    const {accessToken, refreshToken} = getTokens(this.$cookies)
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
        setTokens(this.$cookies, data)
        return true
      } catch (err) {
        console.error(err)
      }
    }
    commit('setLoggedOff')
    return false
  },
}
