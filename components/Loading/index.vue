<template>
  <v-progress-circular
    :rotate="-90"
    :size="100"
    :width="15"
    :value="progress"
    color="primary"
  >
    {{ progress }}
  </v-progress-circular>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'

  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    chars = possible.split('');

  export default {
    name: 'loading',
    components: {

    },
    data() {
      return {
        counter: 0,
        progress: 0,
        power: []
      }
    },
    computed: {

    },
    methods: {
      ...mapActions(['getStrings', 'addStringToDb', 'deleteDB']),
      ...mapMutations([
        'SET_POWER'
      ]),
      async addString () {
        let strings = [],
          startTime = new Date,
          finishTime;
        while (this.counter < 100) {
          // random string for now
          for (let i = 0; i < 100000; i++)
            strings.push(this.makeString())
          await this.addStringToDb(strings)
          this.progress = parseInt((++this.counter / 100).toFixed(2) * 100)
          strings = []
        }
        finishTime = new Date
        console.log(finishTime - startTime);
        this.$emit('loaded', true)
      },
      makeString() {
        let text = [];
          // hs = [];

        // hs[0] = Math.floor(Math.random() * possible.length);
        for (let i = 0; i < 100; i++) {
          // const key = Math.floor(Math.random() * possible.length)
          // if (i !== 0) hs[i] = hs[i - 1] + this.power[i] * key;
          text.push(chars[Math.floor(Math.random() * possible.length)]);
        }
        return text.join('');
      }
    },
    async mounted() {
      if (!window.indexedDB) {
        window.alert("Ваш браузер не поддерживат стабильную версию IndexedDB. Такие-то функции будут недоступны");
      }
      await this.deleteDB();
      this.power[0] = 1;
      for (let i = 1, p = 53; i <= 100; i++) {
        this.power[i] = this.power[i - 1] * p;
      }
      this.SET_POWER(this.power)
      this.addString()
    }
  }
</script>

<style lang="scss">

</style>

