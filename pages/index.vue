<template>
  <v-app>
    <section class="container">
      <v-dialog
        v-model="loading"
        persistent
      >
          <v-layout justify-center align-center>
            <v-progress-circular
              indeterminate
              color="primary"/>
          </v-layout>
      </v-dialog>
      <v-dialog
        v-model="clearDBDialog"
        max-width="290"
        persistent
      >
        <v-card>
          <v-card-title
            class="headline"
            primary-title
          >
            Warning
          </v-card-title>

          <v-card-text>

            The database is not empty. Want to continue or clear the database and regenerate?
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red white--text"
              @click="clearDatabase"
            >
              Clear DB
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="clearDBDialog = false; view = 'InputText'"
            >
              Continue
            </v-btn>
          </v-card-actions>
        </v-card>
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
  import {mapState, mapActions, mapMutations} from 'vuex'

  export default {
    components: {
      Loading,
      InputText
    },
    data() {
      return {
        view: '',
        clearDBDialog: false
      }
    },
    computed: {
      ...mapState({
        loading: state => state.loading
      })
    },
    methods: {
      ...mapActions(['clearDB', 'getCount']),
      ...mapMutations([
        'SET_LOADING'
      ]),
      finishLoading(value) {
        value ? this.view = 'InputText' : 'Loading'
      },
      async clearDatabase() {
        this.clearDBDialog = false;
        this.SET_LOADING(true)
        await this.clearDB()
        this.SET_LOADING(false)
        this.view = 'Loading'
      }
    },
    async mounted() {
      const count = await this.getCount()
      if (count) this.clearDBDialog = true
      else this.view = 'Loading'
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
