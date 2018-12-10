const axios = require('axios')

const namespaced = true

const state = {
  courses: [],
  totalCourses: 0,
  forms: []
}

const mutations = {
  'SET_COURSES' (state, courses) {
    state.courses = courses
    state.totalCourses = courses.length
  },
  'SET_FORMS' (state, forms) {
    state.forms = forms
    console.log(state.forms)
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
  },
  getForms ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/api/form')
        .then(resp => {
          let form = resp.data.form
          commit('SET_FORMS', form)
          resolve(resp)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  sendSurvey ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.put('http://localhost:3000/api/report', data)
        .then(resp => {
          console.log(resp)
          // commit('SEND_SURVEY', token)
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
  getCourses: state => state.courses,
  getForms: state => state.forms
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced
}
