import VueCookies from 'vue-cookies'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const KC_IDP_HINT = 'kc_idp_hint'
const CODE_VERIFIER = 'code_verifier'

export function getCookieRefreshToken() {
  return VueCookies.get(REFRESH_TOKEN)
}

export function getCookieTokens() {
  return {
    accessToken: VueCookies.get(ACCESS_TOKEN),
    refreshToken: VueCookies.get(REFRESH_TOKEN)}
}

export function setCookieTokens(data) {
  VueCookies.set(ACCESS_TOKEN, data.access_token, {
    maxAge: data.expires_in,
    sameSite: true,
  })
  VueCookies.set(REFRESH_TOKEN, data.refresh_token, {
    maxAge: data.refresh_expires_in,
    sameSite: true,
  })
}

export function delCookieTokens() {
  VueCookies.remove(ACCESS_TOKEN)
  VueCookies.remove(REFRESH_TOKEN)
}

export function getCookieKcIdpHint() {
  return VueCookies.get(KC_IDP_HINT)
}

export function setCookieCodeVerifierAndKcIdpHint(codeVerifier, social) {
  VueCookies.set(CODE_VERIFIER, codeVerifier, {
    maxAge: 60,
    sameSite: true,
  })
  VueCookies.set(KC_IDP_HINT, social, {
    maxAge: 2592000, // 30 days
    sameSite: true,
  })
}

export function getCookieCodeVerifier() {
  const codeVerifier = VueCookies.get(CODE_VERIFIER)
  VueCookies.remove(CODE_VERIFIER)
  return codeVerifier
}
