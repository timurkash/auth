<script>
import {ITEMS} from 'assets/consts/items'
import ToolBar from '/components/ToolBar'

export default {
  name: 'DefaultLayout',
  components: {
    ToolBar,
  },
  data: function () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: ITEMS,
      miniVariant: false,
      // right: true,
      // rightDrawer: false,
      title: 'Test',
    }
  },
}
</script>

<template>
  <v-app dark>
    <ToolBar />
    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>
  </v-app>
</template>
