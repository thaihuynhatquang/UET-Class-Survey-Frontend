const axios = require('axios')

const namespaced = true

const state = {
  accounts: [],
  courses: [],
  form: [],
  surveyResult: [],
  surveyInfo: {},
  lecturers: []
}

const mutations = {
  'GET_ALL_ACCOUNTS' (state, accounts) {
    for (let account of accounts) {
      if (account.role === 2) {
        account.role = 'Lecturer'
        let data = {
          fullname: account.fullname,
          id: account.id
        }
        state.lecturers.push(data)
      } else if (account.role === 3) {
        account.role = 'Student'
      } else {
        account.role = 'Admin'
      }
    }
    state.accounts = accounts
  },

  'GET_ALL_COURSES' (state, courses) {
    state.courses = courses
  },

  'GET_RESULT' (state, result) {
    state.surveyResult = result.resultTable
    state.surveyInfo = result.surveyInfo
  },

  'GET_FORM' (state, form) {
    state.form = form
  }
}

const actions = {
  getAllAccounts ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/api/allAccounts')
        .then(resp => {
          let accounts = resp.data
          commit('GET_ALL_ACCOUNTS', accounts)
          resolve(resp)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },

  createAccount ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/api/account', data)
        .then(resp => {
          console.log(resp.data)
          resolve(resp)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },

  deleteAccount ({commit}, id) {
    return new Promise((resolve, reject) => {
      axios.delete('http://localhost:3000/api/account', { data: id })
        .then(resp => {
          console.log(resp.data)
          resolve(resp)
        })
        .catch(err => {
          console.log(err.response.data)
          reject(err)
        })
    })
  },

  updatePassword ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.put('http://localhost:3000/api/passwordForAdmin', data)
        .then(resp => {
          console.log(resp.data)
          resolve(resp)
        })
        .catch(err => {
          console.log(err.response.data)
          reject(err)
        })
    })
  },

  editAccount ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.put('http://localhost:3000/api/infoForAdmin', data)
        .then(resp => {
          console.log(resp.data)
          resolve(resp)
        })
        .catch(err => {
          console.log(err.response.data)
          reject(err)
        })
    })
  },

  importListAccounts ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/api/upList', data)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          console.log(err.response.data)
          reject(err)
        })
    })
  },

  getAllCourses ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/api/courses')
        .then(resp => {
          let courses = resp.data
          commit('GET_ALL_COURSES', courses)
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
      axios.post('http://localhost:3000/api/resultById', data)
        .then(resp => {
          let result = resp.data
          console.log(result)
          commit('GET_RESULT', result)
          resolve(resp)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },

  createNewCourse ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/api/course', data)
        .then(resp => {
          let result = resp.data
          console.log(result)
          resolve(resp)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },

  deleteCourse ({commit}, courseId) {
    return new Promise((resolve, reject) => {
      axios.delete('http://localhost:3000/api/course', { data: courseId })
        .then(resp => {
          console.log(resp.data)
          resolve(resp)
        })
        .catch(err => {
          console.log(err.response.data)
          reject(err)
        })
    })
  },

  getForm ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/api/form')
        .then(resp => {
          let form = resp.data
          commit('GET_FORM', form)
          resolve(resp)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },

}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced
}
