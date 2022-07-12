import {generateCodeChallengeFromVerifier} from "assets/auth/pkce";

const keycloakUrl = process.env.KEYCLOAK_URL
const realm = process.env.REALM

export function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16;//random number between 0 and 16
    if(d > 0){//Use timestamp until depleted
      r = (d + r)%16 | 0;
      d = Math.floor(d/16);
    } else {//Use microseconds since page-load if supported
      r = (d2 + r)%16 | 0;
      d2 = Math.floor(d2/16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

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

export async function getLoginUrl(client, redirectUrl, social, codeVerifier) {
  let state = generateUUID()
  let nonce = generateUUID()
  let codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier)
  let url = getKeycloakUrl('auth')
  return `${url}?client_id=${client}&redirect_uri=${redirectUrl}&state=${state}&response_mode=fragment&response_type=code&scope=openid&nonce=${nonce}&code_challenge=${codeChallenge}&code_challenge_method=S256&kc_idp_hint=${social}`
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
