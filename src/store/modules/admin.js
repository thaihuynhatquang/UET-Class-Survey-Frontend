const axios = require('axios')

const namespaced = true

const url = 'http://localhost:3000'
// const url = 'https://uet-class-survey-backend.herokuapp.com'

const state = {
  accounts: [],
  courses: [],
  form: [],
  statusForm: '',
  surveyResult: [],
  surveyInfo: {},
  lecturers: []
}

const mutations = {
  'GET_ALL_ACCOUNTS' (state, accounts) {
    state.accounts = []
    state.lecturers = []
    if (accounts === undefined || accounts.length === 0) {
      return
    }
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

  'DELETE_ALL_ACCOUNTS' (state) {
    state.accounts = []
    state.lecturers = []
  },

  'GET_ALL_COURSES' (state, courses) {
    state.courses = []
    if (courses === undefined || courses.length === 0) {
      return
    }
    state.courses = courses
  },

  'DELETE_ALL_COURSES' (state) {
    state.courses = []
  },

  'GET_RESULT' (state, result) {
    state.surveyResult = result.resultTable
    state.surveyInfo = result.surveyInfo
  },

  'GET_FORM' (state, form) {
    state.form = []
    if (form === undefined || form.length === 0) {
      return
    }
    state.form = form
  },

  'STATUS_FORM' (state, statusForm) {
    state.statusForm = statusForm
  }
}

const actions = {
  getAllAccounts ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get(url + '/api/allAccounts')
        .then(resp => {
          let accounts = resp.data
          console.log('Accounts: ', accounts)
          commit('GET_ALL_ACCOUNTS', accounts)
          resolve(resp)
        })
        .catch(err => {
          commit('DELETE_ALL_ACCOUNTS')
          reject(err.response.data)
        })
    })
  },

  createAccount ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.post(url + '/api/account', data)
        .then(resp => {
          console.log(resp.data)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  deleteAccount ({commit}, id) {
    return new Promise((resolve, reject) => {
      axios.delete(url + '/api/account', { data: id })
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },

  deleteAllAccounts ({commit}) {
    return new Promise((resolve, reject) => {
      axios.delete(url + '/api/allAccounts')
        .then(resp => {
          resolve(resp)
          commit('DELETE_ALL_ACCOUNTS')
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },

  deleteMultiAccounts ({commit}, listId) {
    return new Promise((resolve, reject) => {
      axios.delete(url + '/api/someAccounts', { data: listId })
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
      axios.put(url + '/api/passwordForAdmin', data)
        .then(resp => {
          console.log(resp.data)
          resolve(resp)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },

  editAccount ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.put(url + '/api/infoForAdmin', data)
        .then(resp => {
          console.log(resp.data)
          resolve(resp)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },

  importListAccounts ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.post(url + '/api/upList', data)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getAllCourses ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get(url + '/api/courses')
        .then(resp => {
          let courses = resp.data
          console.log('Courses: ', courses)
          commit('GET_ALL_COURSES', courses)
          resolve(resp)
        })
        .catch(err => {
          commit('DELETE_ALL_COURSES')
          reject(err.response.data)
        })
    })
  },

  getResultSurvey ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.post(url + '/api/resultById', data)
        .then(resp => {
          let result = resp.data
          console.log(result)
          commit('GET_RESULT', result)
          resolve(resp)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },

  createNewCourse ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.post(url + '/api/course', data)
        .then(resp => {
          let result = resp.data
          console.log(result)
          resolve(resp)
        })
        .catch(err => {
          console.log(err.response)
          reject(err)
        })
    })
  },

  deleteCourse ({commit}, courseId) {
    return new Promise((resolve, reject) => {
      axios.delete(url + '/api/course', { data: courseId })
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },

  deleteCourses ({commit}) {
    return new Promise((resolve, reject) => {
      axios.delete(url + '/api/courses')
        .then(resp => {
          commit('DELETE_ALL_COURSES')
          resolve(resp)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },

  deleteMultiCourses ({commit}, listCourseId) {
    return new Promise((resolve, reject) => {
      axios.delete(url + '/api/someCourses', { data: listCourseId })
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },

  getForm ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get(url + '/api/form')
        .then(resp => {
          let form = resp.data
          commit('GET_FORM', form)
          resolve(resp)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },

  createNewCriteria ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.post(url + '/api/criteria', data)
        .then(resp => {
          console.log(resp.data)
          resolve(resp)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },

  checkStatusForm ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get(url + '/api/checkUpdateForm')
        .then(resp => {
          let statusForm = resp.data
          commit('STATUS_FORM', statusForm)
          resolve(resp)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },

  deleteCriteria ({commit}, criteria) {
    return new Promise((resolve, reject) => {
      axios.delete(url + '/api/criteria', { data: criteria })
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },

  editCriteria ({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.put(url + '/api/criteria', data)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },

  updateAdminPassword ({commit}, data) {
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

}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced
}
