// https://vuex.vuejs.org/en/actions.html

const axios = require('axios')

export default {
  login ({commit}, user) {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST')
      axios.post('http://localhost:3000/api/login', user)
        .then(resp => {
          const token = resp.data.token
          localStorage.setItem('token', token)
          let roleStatus
          switch (resp.data.role) {
            case 1:
              roleStatus = 'Admin'
              break
            case 2:
              roleStatus = 'Lecturer'
              break
            case 3:
              roleStatus = 'Student'
              break
          }
          localStorage.setItem('roleStatus', roleStatus)
          axios.defaults.headers.common['Authorization'] = token
          axios.defaults.headers.put['Content-Type'] = 'application/json'
          commit('AUTH_SUCCESS', token)
          resolve(resp)
        })
        .catch(err => {
          localStorage.removeItem('token')
          commit('AUTH_ERROR')
          reject(err)
        })
    })
  },

  logout ({commit}) {
    return new Promise((resolve, reject) => {
      commit('LOGOUT')
      localStorage.removeItem('token')
      localStorage.removeItem('roleStatus')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  },

  getUser ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/api/profile')
        .then(resp => {
          let data = resp.data
          commit('SET_USER', data)
          commit('SET_AVATAR', data.avatar)
          resolve(resp)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }
}
