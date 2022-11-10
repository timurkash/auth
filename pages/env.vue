<script>

export default {
  name: 'Environments',
  data: () => ({
    nodeEnv: process.env.NODE_ENV,
    apiUrl: null,
    keycloakUrl: null,
    realm: null,
    client: null,
    clientSecret: null,
  }),
  head() {
    return {
      title: "Environment",
      // meta: [
      //   // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      //   { hid: 'description', name: 'description', content: 'My custom description' }
      // ]
    }
  },
  mounted() {
    this.apiUrl = this.$env.API_URL
    this.keycloakUrl = this.$env.KEYCLOAK_URL
    this.realm = this.$env.REALM
    this.client = this.$env.CLIENT
    this.clientSecret = this.$env.CLIENT_SECRET
  },
}
</script>

<template>
  <div>
    <h2>Environments</h2>
    <div class="flex">
      <div class="grid-container">
        <div class="grid-item">NODE_ENV</div>
        <div class="grid-item">{{ nodeEnv }}</div>
        <div class="grid-item">API_URL</div>
        <div class="grid-item">{{ apiUrl }}</div>
        <div class="grid-item">KEYCLOAK_URL</div>
        <div class="grid-item">{{ keycloakUrl }}</div>
        <div class="grid-item">REALM</div>
        <div class="grid-item">{{ realm }}</div>
        <div class="grid-item">CLIENT</div>
        <div class="grid-item">{{ client }}</div>
        <div class="grid-item">CLIENT_SECRET</div>
        <div class="grid-item">{{ clientSecret }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  margin-top: 10px;
  margin-bottom: 16px;
}
.flex {
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
