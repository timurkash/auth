const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const KC_IDP_HINT = 'kc_idp_hint'
const CODE_VERIFIER = 'code_verifier'

export function setTokens(cookies, data) {
  cookies.set(ACCESS_TOKEN, data.access_token, {
    maxAge: data.expires_in,
    sameSite: true,
  })
  cookies.set(REFRESH_TOKEN, data.refresh_token, {
    maxAge: data.refresh_expires_in,
    sameSite: true,
  })
}

export function getRefreshToken(cookies) {
  return cookies.get(REFRESH_TOKEN)
}

export function getTokens(cookies) {
  let accessToken = cookies.get(ACCESS_TOKEN)
  let refreshToken = cookies.get(REFRESH_TOKEN)
  return {accessToken, refreshToken}
}

export function delTokens(cookies) {
  cookies.remove(ACCESS_TOKEN)
  cookies.remove(REFRESH_TOKEN)
}

export function getKcIdpHint(cookies) {
  return cookies.get(KC_IDP_HINT)
}

export function setKcIdpHint(cookies, social) {
  cookies.set(KC_IDP_HINT, social, {
    maxAge: 2592000, // 30 days
    sameSite: true,
  })
}

export function getCodeVerifier(cookies) {
  const codeVerifier = cookies.get(CODE_VERIFIER)
  cookies.remove(CODE_VERIFIER)
  return codeVerifier
}

export function setCodeVerifier(cookies, codeVerifier) {
  cookies.set(CODE_VERIFIER, codeVerifier, {
    maxAge: 60,
    sameSite: true,
  })
}
