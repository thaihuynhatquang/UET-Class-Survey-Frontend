// https://vuex.vuejs.org/en/getters.html

export default {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  getRoleStatus: state => state.role,
  getUser: state => state.user,
  getAvartar: state => state.avatar
}
