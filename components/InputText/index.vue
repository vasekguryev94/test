<template>
  <v-col cols="12" sm="6" md="4">
    <h1>Enter your search text</h1>
    <v-row
      justify="center"
      align="center"
      class="mt-3 mb-6"
    >
      <v-text-field
        label="Text"
        solo
        v-model="text"
        hide-details
      />
      <v-btn
        large
        class="ml-6"
        color="primary"
        @click="search"
      >Search</v-btn>
    </v-row>
    <h3>{{ 'Found matches: ' + strings }}</h3>
  </v-col>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex'

  export default {
    name: 'inputText',
    data() {
      return {
        text: ''
      }
    },
    computed: {
      ...mapState({
        strings: state => state.strings
      })
    },
    methods: {
      ...mapActions(['getStrings']),
      ...mapMutations([
        'SET_STRINGS',
        'SET_LOADING'
      ]),
      async search() {
        this.SET_STRINGS(0)
        if (this.text) {
          this.SET_LOADING(true)
          this.getStrings(this.text)
        }
      }
    }
  }
</script>

<style scoped>

</style>


