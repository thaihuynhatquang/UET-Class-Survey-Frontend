const axios = require('axios')

const namespaced = true

const state = {
  accounts: []
}

const mutations = {
  'GET_ALL_ACCOUNTS' (state, accounts) {
    for (let account of accounts) {
      if (account.role === 2) {
        account.role = 'Lecturer'
      } else if (account.role === 3) {
        account.role = 'Student'
      } else {
        account.role = 'Admin'
      }
    }
    state.accounts = accounts
  }
}

const actions = {
  getAllAccounts ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/api/allAccounts')
        .then(resp => {
          let accounts = resp.data
          console.log(accounts)
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
