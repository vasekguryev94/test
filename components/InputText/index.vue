<template>
  <v-col cols="12" sm="6" md="3">
    <v-text-field
      label="Text"
      solo
      v-model="text"
    />
    <v-btn
      color="primary"
      @click="search"
    >Search</v-btn>
    {{ 'Total: ' + strings }}
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


