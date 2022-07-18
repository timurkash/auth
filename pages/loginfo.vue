<script>
import {getUri} from 'assets/auth/common'
import {mapGetters} from 'vuex'

export default {
  name: 'InspirePage',
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
  watch: {
    accessToken: async function () {
      await this.copy()
    }
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
    copy: async function () {
      if (process.env.NODE_ENV == 'development') {
        await navigator.clipboard.writeText(`{
\t"Authorization": "Bearer ${this.accessToken}"
}`)
      }
    },
    forceRefresh: function () {
      this.$store.dispatch('mAuth/forceRefreshToken')
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
        <div v-if="tokenInfo">
          <h2>tokenInfo</h2>
          <v-container>
            <v-card width="100">
              <v-img :src="tokenInfo.picture"/>
            </v-card>
            <h3>Name</h3>
            <p>{{tokenInfo.name}}</p>
            <h3>UserType</h3>
            <p>{{tokenInfo.user_type}}</p>
            <h3>Roles</h3>
            <span class="role"
                  v-for="item in tokenInfo.realm_access.roles"
                  v-if="item.endsWith('-admin')"
            >
              {{item}}
            </span>
            <div class="flex">
            <h3 @click="copy" class="mr-10 pointer">AccessToken</h3>
            <v-btn color="primary" @click="forceRefresh">Force Refresh Token</v-btn>
            </div>
            <v-textarea :value="accessToken" rows="15" />
          </v-container>
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
.flex {
  display: flex;
}
.pointer {
  cursor: pointer;
}
</style>
