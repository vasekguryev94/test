import api from '~/api/idb'

export default {
  deleteDB() {
    return api.deleteDB()
  },
  addStringToDb ({}, string) {
    return api.saveString(string)
  },
  async getStrings ({ commit }, text) {
    let strings = await api.getStrings(text)
    commit('SET_STRINGS', strings)
    commit('SET_LOADING', false)
  }
}
