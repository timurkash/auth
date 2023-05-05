import VueCookies from 'vue-cookies'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const KC_IDP_HINT = 'kc_idp_hint'
const CODE_VERIFIER = 'code_verifier'

export function getRefreshToken() {
  return VueCookies.get(REFRESH_TOKEN)
}

export function getTokens() {
  let accessToken = VueCookies.get(ACCESS_TOKEN)
  let refreshToken = VueCookies.get(REFRESH_TOKEN)
  return {accessToken, refreshToken}
}

export function setTokens(data) {
  VueCookies.set(ACCESS_TOKEN, data.access_token, {
    maxAge: data.expires_in,
    sameSite: true,
  })
  VueCookies.set(REFRESH_TOKEN, data.refresh_token, {
    maxAge: data.refresh_expires_in,
    sameSite: true,
  })
}

export function delTokens() {
  VueCookies.remove(ACCESS_TOKEN)
  VueCookies.remove(REFRESH_TOKEN)
}

export function getKcIdpHint() {
  return VueCookies.get(KC_IDP_HINT)
}

export function setKcIdpHint(social) {
  VueCookies.set(KC_IDP_HINT, social, {
    maxAge: 2592000, // 30 days
    sameSite: true,
  })
}

export function getCodeVerifier() {
  const codeVerifier = VueCookies.get(CODE_VERIFIER)
  VueCookies.remove(CODE_VERIFIER)
  return codeVerifier
}

export function setCodeVerifier(codeVerifier) {
  VueCookies.set(CODE_VERIFIER, codeVerifier, {
    maxAge: 60,
    sameSite: true,
  })
}
