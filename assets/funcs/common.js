export const delay = ms => new Promise(res => setTimeout(res, ms));
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
