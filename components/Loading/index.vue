<template>
  <div>
    <v-row style="margin-bottom: 10px">
      <span>Generate data</span>
    </v-row>
    <v-row>
      <v-progress-circular
        :rotate="-90"
        :size="100"
        :width="15"
        :value="progress"
        color="primary"
      >
        {{ progress }}
      </v-progress-circular>
    </v-row>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

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
    methods: {
      ...mapActions(['getStrings', 'addStringToDb', 'deleteDB']),
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
    async mounted() {
      if (!window.indexedDB) {
        window.alert("Ваш браузер не поддерживает стабильную версию IndexedDB. Такие-то функции будут недоступны");
      }
      await this.deleteDB()
      this.addString()
    }
  }
</script>

<style scoped>

</style>

