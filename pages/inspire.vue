<script>
import {mapGetters} from 'vuex'
import {randomString} from 'assets/common/common'

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
      // const length = 10
      // let result = '';
      // let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      // let charactersLength = characters.length;
      // for (let i = 0; i < length; i++) {
      //   result += characters.charAt(Math.floor(Math.random() *
      //     charactersLength));
      // }
      this.$store.dispatch('mTime/getTime', randomString())
    },
    empty() {
      this.$store.commit('mTime/emptyTimeString')
    },
  },
}
</script>

<template>
  <div>
<!--    <v-row>-->
<!--      <v-col class="text-center">-->
<!--        <Tutorial/>-->
<!--      </v-col>-->
<!--    </v-row>-->
    <v-row class="justify-center">
      <!--      <v-col class="justify-center">-->
      <!--        <div>-->
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      />
      <!--        </div>-->
      <!--      </v-col>-->
    </v-row>
    <v-row>
      <v-col class="text-center">
        <blockquote class="blockquote">
          “First, solve the problem. Then, write the code.”
          <footer>
            <small>
              <em>&mdash;John Johnson</em>
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

<style lang="scss">
//img {
//  align-items: center;
//}

</style>
