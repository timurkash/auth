import {TimeServicePromiseClient} from '@/assets/jsclient/time/v1/time_service_grpc_web_pb'
import {GetCurrentTimeRequest} from '@/assets/jsclient/time/v1/time_service_pb'
import {getDateTime} from '@/assets/common/common'
// import {Timestamp} from '@/assets/jsclient/timestamp/timestamp_pb'

export const state = () => ({
  timeString: 'n/a',
  timeStrings: [],
  timeString2: null,
})

export const getters = {
  // timeString: state => state.timeString,
  timeStrings: state => state.timeStrings,
  timeString2: state => state.timeString2,
}

export const mutations = {
  // setTimeString: (state, timeString) => state.timeString = timeString,
  // pushTimeString: (state, timeString) => state.timeStrings.push(timeString),
  unshiftTimeString: (state, timeString) => state.timeStrings.unshift(timeString),
  emptyTimeString: (state) => state.timeStrings = [],
  setTimeString2: (state, timeString2) => state.timeString2 = timeString2,
}

const client = new TimeServicePromiseClient(process.env.API_URL, null, null)

export const actions = {
  async getTime({rootState, commit}, dump) {
    try {
      const metadata = rootState.mAuth.metadata
      // if (metadata) {
      const getCurrentTimeRequest = new GetCurrentTimeRequest().setDump(dump)
      console.log("here")
      const response = await client.getCurrentTime(getCurrentTimeRequest, metadata)
      commit('unshiftTimeString', response.getCurrentTime())
      const currentTime2 = getDateTime(response.getCurrentTime2())
      commit('setTimeString2', currentTime2)
    } catch (err) {
      console.error(err)
    }
    // } else {
    //   console.error('not logged')
    // }
  },
}
