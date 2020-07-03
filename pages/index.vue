<template>
  <v-app>
    <section class="container">
      <v-dialog v-model="loading" persistent>
          <v-layout justify-center align-center>
            <v-progress-circular
              indeterminate
              color="primary">
            </v-progress-circular>
          </v-layout>
      </v-dialog>
      <transition name="component-fade" mode="out-in">
        <component @loaded="finishLoading" :is="view"></component>
      </transition>
    </section>
  </v-app>
</template>

<script>
  import Loading from '~/components/Loading'
  import InputText from '~/components/InputText'
  import {mapState} from 'vuex'

  export default {
    components: {
      Loading,
      InputText
    },
    data() {
      return {
        view: 'Loading'
      }
    },
    computed: {
      ...mapState({
        loading: state => state.loading
      })
    },
    methods: {
      finishLoading(value) {
        value ? this.view = 'InputText' : 'Loading'
      }
    }
  }
</script>

<style lang="scss">
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
  .v-dialog {
    box-shadow: none;
    overflow: hidden;
  }
</style>
