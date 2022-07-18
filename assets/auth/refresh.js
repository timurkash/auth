import {getTokens, setTokens} from "assets/auth/cookies";
import {refreshJwt} from "assets/auth/keycloak";

export async function refreshToken(commit, cookies) {
  const {accessToken, refreshToken} = getTokens(cookies)
  if (accessToken) {
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
      setTokens(cookies, data)
      return true
    } catch (err) {
      console.error(err)
    }
  }
  commit('setLoggedOff')
  return false
}

export async function forceRefreshToken(commit, cookies) {
  const {refreshToken} = getTokens(cookies)
  if (refreshToken) {
    try {
      const data = await refreshJwt(refreshToken)
      commit('setTokens', data)
      setTokens(cookies, data)
      return true
    } catch (err) {
      console.error(err)
    }
  }
  commit('setLoggedOff')
  return false
}
