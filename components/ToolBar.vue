<script>

import {ITEMS} from "assets/consts/items";
import {mapGetters} from "vuex";
import {getUri} from "assets/auth/common";

export default {
  name: 'ToolBar',
  data: function () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: ITEMS,
      miniVariant: false,
      title: "Auth",
    }
  },
  computed: {
    ...mapGetters({
      tokenInfo: 'mAuth/tokenInfo',
      kcIdpHint: 'mAuth/kcIdpHint',
      loginUrl: 'mAuth/loginUrl',
    })
  },
  mounted() {
    this.$store.dispatch('mAuth/mounted', {
      keycloakUrl: this.$env.KEYCLOAK_URL,
      realm: this.$env.REALM,
      client: this.$env.CLIENT,
      clientSecret: this.$env.CLIENT_SECRET
    })
  },
  methods: {
    logout: function () {
      this.$store.dispatch('mAuth/logout')
    },
    login: async function () {
      if (this.kcIdpHint) {
        await this.$store.dispatch('mAuth/setCodeVerifier', {
          redirectUri: getUri(location),
          social: this.kcIdpHint,
        })
        window.location.href = this.loginUrl
      } else {
        await this.toLogInfo()
      }
    },
    toLogInfo: async function () {
      await this.$router.push('/loginfo')
    },
  },
}
</script>

<template>
  <div>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
<!--      <v-btn icon @click.stop="clipped = !clipped">-->
<!--        <v-icon>mdi-application</v-icon>-->
<!--      </v-btn>-->
<!--      <v-btn icon @click.stop="fixed = !fixed">-->
<!--        <v-icon>mdi-minus</v-icon>-->
<!--      </v-btn>-->
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
      <div v-if="tokenInfo">
        <img :src="tokenInfo.picture" alt="picture" class="picture" @click="toLogInfo">
      </div>
      <v-btn v-if="!tokenInfo" icon @click="login">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn v-if="tokenInfo" icon @click="logout">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<style lang="scss" scoped>
img.picture {
  border-radius: 50%;
  height: 32px;
  cursor: pointer;
}
</style>
