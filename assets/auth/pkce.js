// GENERATING CODE VERIFIER
function dec2hex(dec) {
  return ("0" + dec.toString(16)).substr(-2);
}
export function generateCodeVerifier() {
  let array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}

// GENERATING CODE CHALLENGE FROM VERIFIER
function sha256(plain) {
  // returns promise ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

function base64urlEncode(a) {
  let str = "";
  let bytes = new Uint8Array(a);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return window.btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function generateCodeChallengeFromVerifier(v) {
  let hashed = await sha256(v);
  let base64encoded = base64urlEncode(hashed);
  return base64encoded;
}
