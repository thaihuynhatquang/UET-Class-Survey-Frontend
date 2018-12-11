import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import app from './modules/app'
import student from './modules/student'
import lecturer from './modules/lecturer'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
  modules: {
    app,
    student,
    lecturer
  }
})

export default store
