const axios = require('axios')

const namespaced = true

const url = 'http://localhost:3000'
// const url = 'https://uet-class-survey-backend.herokuapp.com'

const state = {
  courses: [],
  totalCourses: 0,
  surveyResult: [],
  surveyInfo: {}
}

const mutations = {
  'SET_COURSES' (state, courses) {
    if (courses === undefined || courses.length === 0) {
      state.courses = []
      state.totalCourses = 0
      return
    }
    state.courses = courses
    state.totalCourses = courses.length
  },
  'DEL_COURSES' (state, courses) {
    state.courses = []
    state.totalCourses = 0
  },
  'GET_RESULT' (state, result) {
    state.surveyResult = result.resultTable
    state.surveyInfo = result.surveyInfo
  }
}

const actions = {
  getCourses ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get(url + '/api/courses')
        .then(resp => {
          let courses = resp.data
          commit('SET_COURSES', courses)
          resolve(resp)
        })
        .catch(err => {
          commit('SET_COURSES')
          reject(err.response.data)
        })
    })
  },
  getResultSurvey ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.post(url + '/api/result', data)
        .then(resp => {
          let result = resp.data
          commit('GET_RESULT', result)
          resolve(resp)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },
  changeAvatar ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.put(url + '/api/upAvatar', data)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },
  editInformation ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.put(url + '/api/info', data)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },
  updatePassword ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.put(url + '/api/password', data)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  }
}

const getters = {
  getCourses: state => state.courses,
  getSurveyResult: state => state.surveyResult
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced
}
