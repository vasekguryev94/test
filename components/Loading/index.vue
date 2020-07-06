<template>
  <div>
    <h3>Generate data</h3>
    <v-progress-circular
      :rotate="-90"
      :size="100"
      :width="15"
      :value="progress"
      color="primary"
      class="mt-6"
    >
      {{ progress }}
    </v-progress-circular>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    chars = possible.split('');

  export default {
    name: 'loading',
    data() {
      return {
        counter: 0,
        progress: 0
      }
    },
    computed: {
      ...mapState({
        loading: state => state.loading
      })
    },
    methods: {
      ...mapActions(['getStrings', 'addStringToDb']),
      async addString () {
        let strings = [];
        while (this.counter < 100) {
          // random string for now
          for (let i = 0; i < 100000; i++)
            strings.push(this.makeString())
          await this.addStringToDb(strings)
          this.progress = parseInt((++this.counter / 100).toFixed(2) * 100)
          strings = []
        }
        this.$emit('loaded', true)
      },
      makeString() {
        let text = []
        for (let i = 0; i < 100; i++)
          text.push(chars[Math.floor(Math.random() * possible.length)])
        return text.join('')
      }
    },
    mounted() {
      if (!window.indexedDB) {
        window.alert("Ваш браузер не поддерживает стабильную версию IndexedDB. Такие-то функции будут недоступны");
      }
      this.addString()
    }
  }
</script>

<style scoped>

</style>

