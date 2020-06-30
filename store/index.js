import Vue from 'vue'
import Vuex from 'vuex'
const DB_NAME = 'stringdb'
const STORAGE_NAME = 'strings'
const DB_VERSION = 1
let DB

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    strings: null,
    power: [],
    inputText: [],
    total: 0
  },
  mutations: {
    SET_INPUT_TEXT(state, text) {
      state.inputText = text
    },
    SET_POWER(state, power) {
      state.power = power
    },
    SET_TOTAL(state, total) {
      state.total = total
    }
  },
  actions: {
    async deleteDB() {
      return new Promise((resolve, reject) => {
        const request = window.indexedDB.deleteDatabase(DB_NAME)
        request.onsuccess = () => {
          resolve()
        }
        request.onerror = e => {
          console.log('Error deleting db', e)
          reject('Error')
        }
      })
    },
    async getDb () {
      return new Promise((resolve, reject) => {
        if (DB) {
          return resolve(DB)
        }
        const request = window.indexedDB.open(DB_NAME, DB_VERSION)

        request.onerror = e => {
          console.log('Error opening db', e)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('Error')
        }

        request.onsuccess = e => {
          DB = e.target.result
          resolve(DB)
        }

        request.onupgradeneeded = e => {
          let db = e.target.result
          db.createObjectStore(STORAGE_NAME, { autoIncrement: true })
        }
      })
    },
    async getStrings ({dispatch}) {
      let db = await dispatch('getDb')

      return new Promise(resolve => {
        let trans = db.transaction([STORAGE_NAME], 'readonly')
        trans.oncomplete = () => {
          resolve(strings)
        }

        const store = trans.objectStore(STORAGE_NAME)
        const strings = []

        store.openCursor().onsuccess = e => {
          const cursor = e.target.result
          if (cursor) {
            dispatch('findSubString', cursor.value)
            strings.push(cursor.value)
            cursor.continue()
          }
        }
      })
    },
    async addStringToDb ({dispatch}, string) {
      let db = await dispatch('getDb')
      return new Promise(resolve => {
        let trans = db.transaction([STORAGE_NAME], 'readwrite')
        trans.oncomplete = () => {
          resolve()
        }
        let store = trans.objectStore(STORAGE_NAME)
        store.add(string)
      })
    },
    findSubString({state}, {strings}) {
      strings.forEach(string => {
        if (string[state.inputText.length - 1] === state.inputText[state.inputText.length - 1]) state.total++
      })
    }
  }
})

export default store
