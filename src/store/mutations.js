// https://vuex.vuejs.org/en/mutations.html

export default {
  'AUTH_REQUEST' (state) {
    state.status = 'loading'
  },
  'AUTH_SUCCESS' (state, token) {
    state.status = 'success'
    state.token = token
  },
  'AUTH_ERROR' (state) {
    state.status = 'error'
  },
  'LOGOUT' (state) {
    state.status = ''
    state.token = ''
  },
  'SET_USER' (state, data) {
    state.user = data
  },
  'SET_AVATAR' (state, avatar) {
    state.avatar = 'http://' + avatar
  }
}
