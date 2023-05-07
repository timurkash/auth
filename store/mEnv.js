
export const state = () => ({
  apiUrl: null,
  keycloak: null,
})

export const getters = {
  apiUrl: state => state.apiUrl,
  keycloak: state => state.keycloak,
}

export const mutations = {
  setApiUrl: (state, apiUrl) => state.apiUrl = apiUrl,
  setKeycloak: (state, keycloak) => state.keycloak = keycloak,
}

export const actions = {
  mounted({commit}) {
    commit('setApiUrl', this.$env.API_URL)
    commit('setKeycloak', {
      url: this.$env.KEYCLOAK_URL,
      client: this.$env.KEYCLOAK_CLIENT,
      clientSecret: this.$env.KEYCLOAK_CLIENT_SECRET,
    })
  }
}
