<script>
import {getUri} from 'assets/auth/common'
import {mapGetters} from 'vuex'

export default {
  name: 'LogInfo',
  data: () => ({
    keycloakUrl: null,
    nodeEnv: null,
  }),
  computed: {
    ...mapGetters({
      accessToken: 'mAuth/accessToken',
      tokenInfo: 'mAuth/tokenInfo',
      loginUrl: 'mAuth/loginUrl',
    })
  },
  // watch: {
  //   accessToken: async function () {
  //     await this.copy()
  //   }
  // },
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
    copy: async function () {
      if (process.env.NODE_ENV == 'development') {
        await navigator.clipboard.writeText(`{
\t"Authorization": "Bearer ${this.accessToken}"
}`)
        console.log("accessToken copied")
      } else {
        console.warn("NODE_ENV is not development")
      }
    },
    forceRefresh: function () {
      this.$store.dispatch('mAuth/refreshToken', true)
    },
  },
}
</script>

<template>
  <div>
    <v-row>
      <v-col class="text-center">
        <v-btn color="primary" @click="login('google')" v-show="!tokenInfo">Google</v-btn>
        <v-btn color="primary" @click="login('facebook')" v-show="!tokenInfo">Facebook</v-btn>
      </v-col>
    </v-row>
    <div v-if="tokenInfo">
      <h2>tokenInfo</h2>
      <v-container>
        <div class="flex">
          <div class="grid-container">
            <h4>Name</h4>
            <p>{{ tokenInfo.name }}</p>
            <h4>Email</h4>
            <p>{{ tokenInfo.email }}</p>
            <h4>UserType</h4>
            <p>{{ tokenInfo.user_type }}</p>
            <h4>Roles</h4>
            <div><span class="role" v-for="item in tokenInfo.realm_access.roles" v-if="item.endsWith('-admin')">{{ item }}</span></div>
          </div>
        </div>
        <!--            <v-card width="100">-->
        <!--              <v-img :src="tokenInfo.picture"/>-->
        <!--            </v-card>-->
        <div class="token">
          <h3 @click="copy" class="mr-10 pointer">AccessToken</h3>
          <v-btn color="primary" @click="forceRefresh">Force Refresh Token</v-btn>
        </div>
        <v-textarea :value="accessToken" rows="15"/>
      </v-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
}

.grid-container {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 16px;
}

img.picture {
  border-radius: 50%;
  height: 96px;
}

span.role {
  margin-right: 10px;
}

.token {
  display: flex;
  margin-top: 20px;
}

.pointer {
  cursor: pointer;
}
</style>
