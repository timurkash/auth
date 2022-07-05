import {TimeServiceClient} from "~/store/jsclient/time/v1/time_service_grpc_web_pb";
import {GetCurrentTimeRequest} from "~/store/jsclient/time/v1/time_service_pb";

const apiUrl = process.env.API_URL

export const state = () => ({
  timeString: 'n/a',
  timeStrings: [],
})

export const getters = {
  timeString: state => state.timeString,
  timeStrings: state => state.timeStrings,
}

export const mutations = {
  setTimeString: (state, timeString) => state.timeString = timeString,
  pushTimeString: (state, timeString) => state.timeStrings.push(timeString),
  unshiftTimeString: (state, timeString) => state.timeStrings.unshift(timeString),
  emptyTimeString: (state) => state.timeStrings = [],
}

const client = new TimeServiceClient(apiUrl, null, null)

const getCurrentTimePromise = () => {
  return new Promise((resolve, reject) => {
    client.getCurrentTime(new GetCurrentTimeRequest(), {}, (err, response) => {
      if (err) return reject(err)
      resolve(response)
    })
  })
}

export const actions = {
  async getTime({commit}) {
    try {
      const response = await getCurrentTimePromise()
      commit('unshiftTimeString', response.getCurrentTime())
    } catch (err) {
      console.error(err)
    }
  },
}
