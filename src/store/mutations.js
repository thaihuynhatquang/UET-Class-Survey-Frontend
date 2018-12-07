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
  'SET_ROLE' (state, role) {
    switch (role) {
      case 1:
        state.role = 'Admin'
        break
      case 2:
        state.role = 'Lecturer'
        break
      case 3:
        state.role = 'Student'
        break
    }
  },
  'SET_AVATAR' (state, avatar) {
    state.avatar = 'http://' + avatar
  }
}
