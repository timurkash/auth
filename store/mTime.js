import {TimeServiceClient} from "~/store/jsclient/time/v1/time_service_grpc_web_pb";
import {GetCurrentTimeRequest} from "~/store/jsclient/time/v1/time_service_pb";

const client = new TimeServiceClient("http://localhost:8091", null, null)

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

export const actions = {
  getTime({commit}) {
    client.getCurrentTime(new GetCurrentTimeRequest(), {}, (err, response) => {
      if (err) {

      } else {
        commit('unshiftTimeString', response.getCurrentTime())
      }
    });
  },
}
