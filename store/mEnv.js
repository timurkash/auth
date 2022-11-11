
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
}
