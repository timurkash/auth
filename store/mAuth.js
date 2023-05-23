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

const minute = 60000

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
  setTokens: (state, {data}) => {
    state.accessToken = data.access_token
    state.refreshToken = data.refresh_token
    state.metadata = {authorization: `Bearer ${data.access_token}`}
    state.tokenInfo = parseToken(data.access_token)
    setCookieTokens(data)
  },
  setLoggedOff: (state) => {
    if (state.accessToken) {
      state.accessToken = null
      state.refreshToken = null
      state.metadata = null
      state.tokenInfo = null
      delCookieTokens()
    }
  },
}

export const actions = {
  async mounted({commit, dispatch}) {
    setParams({
      url: this.$env.KEYCLOAK_URL,
      client: this.$env.KEYCLOAK_CLIENT,
      clientSecret: this.$env.KEYCLOAK_CLIENT_SECRET,
    })
    commit('setSocial', getCookieSocial())
    setInterval(() => {
      const {refreshToken} = getCookieTokens()
      if (!refreshToken) {
        commit('setLoggedOff')
      }
    }, minute)
    if (!await dispatch('refreshToken')) {
      const code = new URLSearchParams(location.hash.substring(1)).get("code")
      const codeVerifier = getCookieCodeVerifier()
      await this.$router.push(`${location.pathname}${location.search}`)
      if (codeVerifier && code) {
        try {
          commit('setTokens', await getJwt({codeVerifier, code}))
        } catch (err) {
          console.log(err)
          commit('setLoggedOff')
        }
      }
    }
  },
  async setCodeVerifier({}, social) {
    const codeVerifier = generateCodeVerifier()
    setCookieCodeVerifierAndSocial({codeVerifier, social})
    window.location.href = await getLoginUrl({codeVerifier, social})
  },
  async refreshToken({commit}, force) {
    const {accessToken, refreshToken} = getCookieTokens()
    if (!force && accessToken) {
      commit('setTokens', {
        data: {
          access_token: accessToken,
          refresh_token: refreshToken,
        }
      })
      return true
    }
    if (refreshToken) {
      try {
        commit('setTokens', await refreshJwt(refreshToken))
        return true
      } catch (err) {
        console.error(err)
      }
    }
    return false
  },
  async logout({commit}) {
    const {refreshToken} = getCookieTokens()
    if (refreshToken) {
      try {
        await logout(refreshToken)
      } catch (err) {
        console.error(err)
      }
    }
    commit('setLoggedOff')
  },
}
