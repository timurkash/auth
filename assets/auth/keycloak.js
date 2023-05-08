import axios from 'axios'

import {generateUUID} from '@/assets/auth/common'
import {generateCodeChallengeFromVerifier} from '@/assets/auth/pkce'

const AUTH = '/auth'
const TOKEN = '/token'
const LOGOUT = '/logout'
const POST = 'POST'
const HEADER = {
  'content-type': 'application/x-www-form-urlencoded',
}

let params = {
  url: null,
  client: null,
  clientSecret: null
}

export function setParams(theParams) {
  params = theParams
}

function getUri(location) {
  return `${location.protocol}//${location.host}${location.pathname}${location.search}`
}

function getQuery(obj) {
  return Object.keys(obj)
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&')
}

export async function getLoginUrl({location, codeVerifier, social}) {
  return `${params.url}${AUTH}?${getQuery({
    client_id: params.client,
    redirect_uri: getUri(location),
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

export async function getJwt({location, codeVerifier, code}) {
  return axios({
    url: `${params.url}${TOKEN}`,
    method: POST,
    headers: HEADER,
    data: getQuery({
      code: code,
      grant_type: 'authorization_code',
      client_id: params.client,
      client_secret: params.clientSecret,
      redirect_uri: getUri(location),
      code_verifier: codeVerifier,
    }),
  });
}

export async function refreshJwt(refreshToken) {
  return axios({
    url: `${params.url}${TOKEN}`,
    method: POST,
    headers: HEADER,
    data: getQuery({
      grant_type: 'refresh_token',
      client_id: params.client,
      client_secret: params.clientSecret,
      refresh_token: refreshToken,
    }),
  })
}

export async function logout(refreshToken) {
  return axios({
    url: `${params.url}${LOGOUT}`,
    method: POST,
    headers: HEADER,
    data: getQuery({
      client_id: params.client,
      client_secret: params.clientSecret,
      refresh_token: refreshToken,
    }),
  })
}
