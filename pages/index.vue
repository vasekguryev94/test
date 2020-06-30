<template>
  <v-app>
    <section class="container">
      <loading
        v-if="!loaded"
        @loaded="finishLoading"
      />
      <input-text v-if="loaded" />
    </section>
  </v-app>
</template>

<script>
  import Loading from '~/components/Loading'
  import InputText from '~/components/InputText'

  export default {
    components: {
      Loading,
      InputText
    },
    data() {
      return {
        loaded: false
      }
    },
    methods: {
      finishLoading(value) {
        this.loaded = value
      }
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
