<script>
import {mapGetters} from 'vuex'
import {randomString} from '@/assets/common/common'

export default {
  // name: 'InspirePage',
  data: () => ({}),
  computed: {
    ...mapGetters({
      // timeString: 'mTime/timeString',
      timeStrings: 'mTime/timeStrings',
      timeString2: 'mTime/timeString2',
    })
  },
  methods: {
    getTime() {
      this.$store.dispatch('mTime/getTime',
        randomString('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 10))
    },
    empty() {
      this.$store.commit('mTime/emptyTimeString')
    },
  },
}
</script>

<template>
  <div>
    <v-row><img src="/vuetify-logo.svg" alt="Vuetify.js" class="vuetify"/></v-row>
    <v-row>
      <v-col class="text-center">
        <blockquote class="blockquote">
          “First, solve the problem. Then, write the code.”
          <footer>
            <small>
              <em>— John Johnson</em>
            </small>
          </footer>
        </blockquote>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn @click="getTime">Time</v-btn>
        <v-btn @click="empty">Empty</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        {{ timeString2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <h3 v-for="item in timeStrings">{{ item }}</h3>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
img.vuetify {
  margin-top: 20px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
}
</style>
