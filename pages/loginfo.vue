<script>
import {mapGetters} from 'vuex'

export default {
  name: 'LogInfo',
  data: () => ({}),
  computed: {
    ...mapGetters({
      accessToken: 'mAuth/accessToken',
      tokenInfo: 'mAuth/tokenInfo',
    })
  },
  // watch: {
  //   accessToken: async function () {
  //     await this.copy()
  //   }
  // },
  methods: {
    login: async function (social) {
      if (social !== 'google') {
        alert('nothing but google is supported')
      } else {
        await this.$store.dispatch('mAuth/setCodeVerifier', {location, social})
      }
    },
    forceRefresh: async function () {
      await this.$store.dispatch('mAuth/refreshToken', true)
      await this.copy()
    },
    copy: async function () {
      await navigator.clipboard.writeText(`{
\t"Authorization": "Bearer ${this.accessToken}"
}`)
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
      <v-row>
        <v-col class="col-9">
          <h3>tokenInfo</h3>
          <div class="grid-container">
            <h4>Id</h4>
            <h4>{{ tokenInfo.sub }}</h4>
            <h4>Name</h4>
            <h4>{{ tokenInfo.name }}</h4>
            <h4>Email</h4>
            <h4>{{ tokenInfo.email }}</h4>
            <h4>UserType</h4>
            <h4>{{ tokenInfo.user_type }}</h4>
            <h4>Roles</h4>
            <h5><span class="role" v-for="item in tokenInfo.realm_access.roles" v-if="item.endsWith('-admin')">
              {{ item }}</span>
            </h5>
          </div>
        </v-col>
        <v-col class="col-3">
          <v-card width="96">
            <v-img class="pic" :src="tokenInfo.picture" alt="pic"/>
          </v-card>
        </v-col>
      </v-row>
      <div class="token">
        <div class="buttons">
          <h3 @click="copy" class="mr-10 pointer">AccessToken</h3>
          <v-btn color="primary" @click="forceRefresh">Force Refresh Token</v-btn>
        </div>
        <v-textarea :value="accessToken" rows="10" class="area" hide-details readonly/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.token-info {
  display: flex;
}

.grid-container {
  display: inline-grid;
  grid-template-columns: auto auto;
  column-gap: 16px;

  span.role {
    margin-right: 10px;
  }
}

img.picture {
  border-radius: 50%;
  height: 96px;
}

.token {
  margin-top: 15px;

  .buttons {
    display: flex;
    margin-bottom: -8px;
  }
}

.pointer {
  cursor: pointer;
}

</style>
