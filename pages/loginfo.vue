<script>
import {getUri} from 'assets/auth/common'
import {mapGetters} from "vuex"

export default {
  name: 'InspirePage',
  data: () => ({
    keycloakUrl: null,
    nodeEnv: null,
  }),
  computed: {
    ...mapGetters({
      accessToken: 'mAuth/accessToken',
      userInfo: 'mAuth/userInfo',
      loginUrl: 'mAuth/loginUrl',
    })
  },
  async mounted() {
    this.keycloakUrl = process.env.KEYCLOAK_URL
    this.nodeEnv = process.env.NODE_ENV
    // await this.$store.dispatch('mAuth/mounted')
    // await this.$store.dispatch('mAuth/getTokens')
    // let pathnameSearch = `${location.pathname}${location.search}`
    // if (this.userInfo) {
    //   await this.$router.push({
    //     path: pathnameSearch,
    //   })
    // } else {
    //   let params = getParams(location.hash)
    //   await this.$router.push({
    //     path: pathnameSearch,
    //   })
    //   if (params.code) {
    //     await this.$store.dispatch('mAuth/getJwt', {
    //       code: params.code,
    //       redirectUri: getUri(location),
    //     })
    //   }
    // }
  },
  methods: {
    login: async function (social) {
      if (social == 'google') {
        await this.$store.dispatch('mAuth/setCodeVerifier', {
          redirectUri: getUri(location),
          social: social,
        })
        window.location.href = this.loginUrl
      } else {
        alert('nothing but google is supported')
      }
    },
  },
}
</script>

<template>
  <div>
    <v-row>
      <v-col class="text-center">
        <v-btn color="primary" @click="login('google')" v-show="!userInfo">Google</v-btn>
        <v-btn color="primary" @click="login('facebook')" v-show="!userInfo">Facebook</v-btn>
        <div v-if="userInfo">
          <h2>UserInfo</h2>
          <v-container>
            <v-card width="100">
              <v-img :src="userInfo.picture"/>
            </v-card>
            <h3>Name</h3>
            <p>{{userInfo.name}}</p>
            <h3>UserType</h3>
            <p>{{userInfo.user_type}}</p>
            <h3>Roles</h3>
            <span class="role"
                  v-for="item in userInfo.realm_access.roles"
                  v-if="item.endsWith('-admin')"
            >
              {{item}}
            </span>
            <h3>Keycloak URL</h3>
            <p>{{ nodeEnv }}::{{ keycloakUrl }}</p>
            <h3>AccessToken</h3>
            <v-textarea :value="accessToken" />
            <!--            <h3>userInfo</h3>-->
<!--            <p>{{ userInfo }}</p>-->
          </v-container>
          <!--          <div>-->
          <!--            <img :src="userInfo.picture" alt="picture" class="picture">-->
          <!--          </div>-->
          <!--          <v-card max-width="100" class="mx-auto my-12">-->
          <!--            <v-img :src="userInfo.picture"/>-->
          <!--          </v-card>-->
          <!--          <h3>AccessToken</h3>-->
          <!--          <p>{{ accessToken }}</p>-->
          <!--          <h3>RefreshToken</h3>-->
          <!--          <p>{{ refreshToken }}</p>-->
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
img.picture {
  border-radius: 50%;
  height: 96px;
}
span.role {
  margin: 10px;
}
</style>
