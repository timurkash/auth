<script>
import ToolBar from '/components/ToolBar'

export default {
  name: 'DefaultLayout',
  components: {
    ToolBar,
  },
  mounted() {
    this.$store.commit('mEnv/setApiUrl', this.$env.API_URL)
    const keycloakParams = {
      url: this.$env.KEYCLOAK_URL,
      realm: this.$env.REALM,
      client: this.$env.CLIENT,
      clientSecret: this.$env.CLIENT_SECRET,
    }
    this.$store.commit('mEnv/setKeycloak', keycloakParams)
    this.$store.dispatch('mAuth/mounted', keycloakParams)
  },
}
</script>

<template>
  <v-app>
    <ToolBar />
    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>
  </v-app>
</template>
