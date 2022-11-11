<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Environments',
  data: () => ({
    nodeEnv: process.env.NODE_ENV,
  }),
  computed: {
    ...mapGetters({
      apiUrl: 'mEnv/apiUrl',
      keycloak: 'mEnv/keycloak',
    })
  },
  head() {
    return {
      title: "Environment",
      // meta: [
      //   // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      //   { hid: 'description', name: 'description', content: 'My custom description' }
      // ]
    }
  },
}
</script>

<template>
  <div>
    <h2>Environments</h2>
    <div>
      <div class="content">
        <div class="grid-container">
          <div class="grid-item">NODE_ENV</div>
          <div class="grid-item">{{ nodeEnv }}</div>
          <div class="grid-item">API_URL</div>
          <div class="grid-item">{{ apiUrl }}</div>
        </div>
      </div>
      <h3>Keycloak</h3>
      <div class="content" v-if="keycloak">
        <div class="grid-container">
          <div class="grid-item">KEYCLOAK_URL</div>
          <div class="grid-item">{{ keycloak.url }}</div>
          <div class="grid-item">REALM</div>
          <div class="grid-item">{{ keycloak.realm }}</div>
          <div class="grid-item">CLIENT</div>
          <div class="grid-item">{{ keycloak.client }}</div>
          <div class="grid-item">CLIENT_SECRET</div>
          <div class="grid-item">{{ keycloak.clientSecret }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  margin-top: 10px;
  margin-bottom: 16px;
}
h3 {
  margin-top: 24px;
  margin-bottom: 10px;
}
.content {
  display: flex;
  .grid-container {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 16px;
    row-gap: 10px;

    .grid-item {
      //border: 1px white solid;
    }
  }
}
</style>
