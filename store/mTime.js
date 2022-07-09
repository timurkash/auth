import {TimeServicePromiseClient} from 'assets/jsclient/time/v1/time_service_grpc_web_pb'
import {GetCurrentTimeRequest} from 'assets/jsclient/time/v1/time_service_pb'

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

const client = new TimeServicePromiseClient(apiUrl, null, null)

export const actions = {
  async getTime({rootState, commit}, dump) {
    const metadata = rootState.mAuth.metadata
    if (metadata) {
      try {
        const getCurrentTimeRequest = new GetCurrentTimeRequest().
          setDump(dump)
        const response = await client.getCurrentTime(getCurrentTimeRequest, metadata)
        commit('unshiftTimeString', response.getCurrentTime())
      } catch (err) {
        console.error(err)
      }
    } else {
      console.error('not logged')
    }
  },
}
