const axios = require('axios')

const namespaced = true

const state = {
  courses: []
}

const mutations = {
  'SET_COURSES' (state, courses) {
    state.courses = courses
  }
}

const actions = {
  getCourses ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/api/courses')
        .then(resp => {
          let courses = resp.data.courses
          commit('SET_COURSES', courses)
          resolve(resp)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }
}

const getters = {
  getCourses: state => state.courses
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced
}
