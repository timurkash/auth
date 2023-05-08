import VueCookies from 'vue-cookies'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const KC_IDP_HINT = 'kc_idp_hint'
const CODE_VERIFIER = 'code_verifier'

export function getCookieTokens() {
  return {
    accessToken: VueCookies.get(ACCESS_TOKEN),
    refreshToken: VueCookies.get(REFRESH_TOKEN)}
}

export function setCookieTokens(data) {
  if (data.expires_in) {
    VueCookies.set(ACCESS_TOKEN, data.access_token, `${data.expires_in}s`)
  }
  if (data.refresh_expires_in) {
    VueCookies.set(REFRESH_TOKEN, data.refresh_token, `${data.refresh_expires_in}s`)
  }
}

export function delCookieTokens() {
  VueCookies.remove(ACCESS_TOKEN)
  VueCookies.remove(REFRESH_TOKEN)
}

export function getCookieCodeVerifier() {
  const codeVerifier = VueCookies.get(CODE_VERIFIER)
  VueCookies.remove(CODE_VERIFIER)
  return codeVerifier
}

export function getCookieSocial() {
  return VueCookies.get(KC_IDP_HINT)
}

export function setCookieCodeVerifierAndSocial({codeVerifier, social}) {
  VueCookies.set(CODE_VERIFIER, codeVerifier, "60s")
  VueCookies.set(KC_IDP_HINT, social, "30d")
}
