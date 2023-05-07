<script>
import ToolBar from '/components/ToolBar'

export default {
  name: 'DefaultLayout',
  components: {
    ToolBar,
  },
  mounted() {
    this.$store.dispatch('mEnv/mounted')
    this.$store.dispatch('mAuth/mounted')
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


<style lang="scss">
.v-textarea textarea {
  font-size: 12px;
  line-height: 1rem;
}
</style>

