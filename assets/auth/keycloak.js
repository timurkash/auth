import axios from 'axios'
import {generateUUID, getQuery} from '@/assets/auth/common';
import {generateCodeChallengeFromVerifier} from '@/assets/auth/pkce';

const AUTH = '/auth'
const TOKEN = '/token'
const LOGOUT = '/logout'
const POST = 'POST'
const HEADER = {
  'content-type': 'application/x-www-form-urlencoded',
}

let client, clientSecret, keycloakUrl

export function setParams(params) {
  client = params.client
  clientSecret = params.clientSecret
  keycloakUrl = `${params.url}/realms/${params.realm}/protocol/openid-connect`
}

export async function getLoginUrl(redirectUrl, social, codeVerifier) {
  return `${keycloakUrl}${AUTH}?${getQuery({
    client_id: client,
    redirect_uri: redirectUrl,
    state: generateUUID(),
    response_mode: 'fragment',
    response_type: 'code',
    scope: 'openid',
    nonce: generateUUID(),
    code_challenge: await generateCodeChallengeFromVerifier(codeVerifier),
    code_challenge_method: 'S256',
    kc_idp_hint: social,
  })}`
}

export async function getJwt(code, redirectUri, codeVerifier) {
  const {data} = await axios({
    url: `${keycloakUrl}${TOKEN}`,
    method: POST,
    headers: HEADER,
    data: getQuery({
      code: code,
      grant_type: 'authorization_code',
      client_id: client,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  })
  return data
}

export async function refreshJwt(refreshToken) {
  const {data} = await axios({
    url: `${keycloakUrl}${TOKEN}`,
    method: POST,
    headers: HEADER,
    data: getQuery({
      grant_type: 'refresh_token',
      client_id: client,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }),
  })
  return data
}

export async function logout(refreshToken) {
  await axios({
    url: `${keycloakUrl}${LOGOUT}`,
    method: POST,
    headers: HEADER,
    data: getQuery({
      client_id: client,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }),
  })
}
