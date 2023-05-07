// GENERATING CODE VERIFIER
function dec2hex(dec) {
  return dec.toString().slice(-2)
}
export function generateCodeVerifier() {
  let array = new Uint32Array(56 / 2)
  window.crypto.getRandomValues(array)
  return Array.from(array, dec2hex).join("")
}

// GENERATING CODE CHALLENGE FROM VERIFIER
function sha256(plain) {
  // returns promise ArrayBuffer
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest("SHA-256", data)
}

function base64urlEncode(a) {
  let str = ""
  let bytes = new Uint8Array(a)
  for (let i = 0; i < bytes.byteLength; i++) {
    str += String.fromCharCode(bytes[i])
  }
  return window.btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

export async function generateCodeChallengeFromVerifier(v) {
  return base64urlEncode(await sha256(v))
}
