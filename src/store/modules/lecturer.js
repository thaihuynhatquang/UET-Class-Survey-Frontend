const axios = require('axios')

const namespaced = true

const state = {
  courses: [],
  totalCourses: 0,
  surveyResult: [],
  surveyInfo: {}
}

const mutations = {
  'SET_COURSES' (state, courses) {
    state.courses = courses
    state.totalCourses = courses.length
  },
  'GET_RESULT' (state, result) {
    state.surveyResult = result.resultTable
    state.surveyInfo = result.surveyInfo
  }
}

const actions = {
  getCourses ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/api/courses')
        .then(resp => {
          let courses = resp.data
          commit('SET_COURSES', courses)
          resolve(resp)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  getResultSurvey ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.post('https://localhost:3000/api/result', data)
        .then(resp => {
          let result = resp.data
          commit('GET_RESULT', result)
          resolve(resp)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  changeAvatar ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/api/upAvatar', data)
        .then(resp => {
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
  getSurveyResult: state => state.surveyResult
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced
}
