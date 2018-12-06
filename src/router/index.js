import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Auth/Login.vue'
import Dashboard from '@/components/Student/Student.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/student/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ],
  mode: 'history'
})
