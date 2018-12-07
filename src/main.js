// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// Sync router with store
import { sync } from 'vuex-router-sync'

import App from '@/App'
import router from '@/router'
import store from '@/store'
import Vuetify from 'vuetify'
import Axios from 'axios'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    mainColor: '#43425D'
  }
})

Vue.prototype.$http = Axios
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

// Sync store with router
sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
