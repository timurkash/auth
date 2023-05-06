import axios from 'axios'
import {generateUUID} from '@/assets/auth/common';
import {generateCodeChallengeFromVerifier} from '@/assets/auth/pkce';

const AUTH = 'auth'
const TOKEN = 'token'
const LOGOUT = 'logout'
const REFRESH_TOKEN = 'refresh_token'
const AUTHORIZATION_CODE = 'authorization_code'
const HEADER = {
  'content-type': 'application/x-www-form-urlencoded',
}

let url, realm, client, clientSecret

export function setParams(params) {
  url = params.url
  realm = params.realm
  client = params.client
  clientSecret = params.clientSecret
}

export function getKeycloakUrl(route) {
  return `${url}/realms/${realm}/protocol/openid-connect/${route}`
}

export async function getLoginUrl(redirectUrl, social, codeVerifier) {
  let state = generateUUID()
  let nonce = generateUUID()
  let codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier)
  return `${getKeycloakUrl(AUTH)}?client_id=${client}&redirect_uri=${redirectUrl}&state=${state}&response_mode=fragment&response_type=code&scope=openid&nonce=${nonce}&code_challenge=${codeChallenge}&code_challenge_method=S256&kc_idp_hint=${social}`
}

function getString(params) {
  return Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')
}

export async function getJwt(code, redirectUri, codeVerifier) {
  const {data} = await axios({
    url: getKeycloakUrl(TOKEN),
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
    url: getKeycloakUrl(TOKEN),
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
    url: getKeycloakUrl(LOGOUT),
    method: 'POST',
    data: getString({
      client_id: client,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }),
    headers: HEADER,
  })
}
