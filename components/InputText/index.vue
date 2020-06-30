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
    {{ 'Total: ' + total }}
  </v-col>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex'

  export default {
    name: 'inputText',
    components: {

    },
    data() {
      return {
        text: ''
      }
    },
    computed: {
      ...mapState({
        power: state => state.power,
        total: state => state.total
      })
    },
    methods: {
      ...mapActions(['getStrings']),
      ...mapMutations([
        'SET_INPUT_TEXT',
        'SET_TOTAL'
      ]),
      search() {
        this.SET_TOTAL(0)
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let hs = []

        hs[0] = possible.indexOf(this.text[0]) + 1
        for (let i = 1; i < this.text.length; i++) {
          const key = possible.indexOf(this.text[i]) + 1
          hs[i] = hs[i - 1] + this.power[i] * key;
        }
        this.SET_INPUT_TEXT(hs)
        this.getStrings()
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>


