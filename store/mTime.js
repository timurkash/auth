import {TimeServiceClient} from "~/assets/jsclient/time/v1/time_service_grpc_web_pb";
import {GetCurrentTimeRequest} from "~/assets/jsclient/time/v1/time_service_pb";

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

const getCurrentTimePromise = (metadata, dump) => {
  return new Promise((resolve, reject) => {
    const getCurrentTimeRequest = new GetCurrentTimeRequest()
    getCurrentTimeRequest.setDump(dump)
    client.getCurrentTime(getCurrentTimeRequest, metadata, (err, response) => {
      if (err) return reject(err)
      resolve(response)
    })
  })
}

export const actions = {
  async getTime({rootState, commit}, dump) {
    const metadata = rootState.mAuth.metadata
    console.log(metadata)
    try {
      const response = await getCurrentTimePromise(metadata, dump)
      commit('unshiftTimeString', response.getCurrentTime())
    } catch (err) {
      console.error(err)
    }
  },
}
