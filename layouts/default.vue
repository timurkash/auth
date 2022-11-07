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
    <!--    <v-navigation-drawer-->
    <!--      v-model="rightDrawer"-->
    <!--      :right="right"-->
    <!--      temporary-->
    <!--      fixed-->
    <!--    >-->
    <!--      <v-list>-->
    <!--        <v-list-item @click.native="right = !right">-->
    <!--          <v-list-item-action>-->
    <!--            <v-icon light>-->
    <!--              mdi-repeat-->
    <!--            </v-icon>-->
    <!--          </v-list-item-action>-->
    <!--          <v-list-item-title>Switch drawer (click me)</v-list-item-title>-->
    <!--        </v-list-item>-->
    <!--      </v-list>-->
    <!--    </v-navigation-drawer>-->
    <!--    <v-footer-->
    <!--      :absolute="!fixed"-->
    <!--      app-->
    <!--    >-->
    <!--      <span>&copy; {{ new Date().getFullYear() }}</span>-->
    <!--    </v-footer>-->
  </v-app>
</template>
