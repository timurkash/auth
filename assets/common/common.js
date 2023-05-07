import moment from 'moment'

export function randomString(characters, length = 10) {
  let result = '';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result
}

export function getDateTime(ts) {
  return new Date(ts.getSeconds() * 1000 + ts.getNanos() / 1000000)
}

export function getDateTimeString(ts) {
  return moment(new Date(ts.getSeconds() * 1000 + ts.getNanos() / 1000000))
    .format("yyyy-MM-DD HH:mm:ss.SSS")
}
