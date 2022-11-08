<script>
import ToolBar from '/components/ToolBar'

export default {
  name: 'DefaultLayout',
  components: {
    ToolBar,
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
