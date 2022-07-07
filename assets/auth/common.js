import {generateCodeChallengeFromVerifier} from "assets/auth/pkce";
import {generateUUID} from "assets/auth/uuid";

const keycloakUrl = process.env.KEYCLOAK_URL
const realm = process.env.REALM

export function parseToken(token) {
  let base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

export function getKeycloakUrl(route) {
  return `${keycloakUrl}/auth/realms/${realm}/protocol/openid-connect/${route}`
}

export async function getLoginUrl(client, redirectUrl, socialNet, codeVerifier) {
  let state = generateUUID()
  let nonce = generateUUID()
  let codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier)
  let url = getKeycloakUrl('auth')
  return `${url}?client_id=${client}&redirect_uri=${redirectUrl}&state=${state}&response_mode=fragment&response_type=code&scope=openid&nonce=${nonce}&code_challenge=${codeChallenge}&code_challenge_method=S256&kc_idp_hint=${socialNet}`
}

export function getUri(location) {
  return `${location.protocol}//${location.host}${location.pathname}${location.search}`
}

export function getParams(hash) {
  if (hash.charAt(0) == '#') {
    hash = hash.substring(1)
  }
  let res = {}
  hash.split("&").forEach((item) => {
    let keyValue = item.split("=")
    res[keyValue[0]] = keyValue[1]
  })
  return res
}
