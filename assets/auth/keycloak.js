import axios from 'axios'
import {getTokens, setTokens} from "assets/auth/cookies";
import {generateUUID} from 'assets/auth/common';
import {generateCodeChallengeFromVerifier} from 'assets/auth/pkce';

let keycloakUrl, realm, client, clientSecret

const REFRESH_TOKEN = 'refresh_token'
const AUTHORIZATION_CODE = 'authorization_code'
const HEADER = {
  'content-type': 'application/x-www-form-urlencoded',
}

export function setParams(params) {
  keycloakUrl = params.keycloakUrl
  realm = params.realm
  client = params.client
  clientSecret = params.clientSecret
}

export function getKeycloakUrl(route) {
  return `${keycloakUrl}/auth/realms/${realm}/protocol/openid-connect/${route}`
}

export async function getLoginUrl(redirectUrl, social, codeVerifier) {
  let state = generateUUID()
  let nonce = generateUUID()
  let codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier)
  let url = getKeycloakUrl('auth')
  return `${url}?client_id=${client}&redirect_uri=${redirectUrl}&state=${state}&response_mode=fragment&response_type=code&scope=openid&nonce=${nonce}&code_challenge=${codeChallenge}&code_challenge_method=S256&kc_idp_hint=${social}`
}

function getString(params) {
  return Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')
}

export async function getJwt(code, redirectUri, codeVerifier) {
  const {data} = await axios({
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
    headers: HEADER,
  })
  return data
}

export async function refreshJwt(refreshToken) {
  const {data} = await axios({
    url: getKeycloakUrl('token'),
    method: 'POST',
    data: getString({
      grant_type: REFRESH_TOKEN,
      client_id: client,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }),
    headers: HEADER,
  })
  return data
}

export async function logout(refreshToken) {
  await axios({
    url: getKeycloakUrl('logout'),
    method: 'POST',
    data: getString({
      client_id: client,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }),
    headers: HEADER,
  })
}

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
