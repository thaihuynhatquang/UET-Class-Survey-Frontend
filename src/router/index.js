import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import Login from '@/components/Auth/Login.vue'
import Student from '@/components/Student/Student.vue'
import CourseOverview from '@/components/Student/CourseOverview'
import UserProfile from '@/components/Student/UserProfile.vue'

Vue.use(Router)

let router = new Router({
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
      path: '/student',
      component: Student,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          redirect: 'dashboard'
        },
        {
          path: 'dashboard',
          name: 'Course Overview',
          component: CourseOverview
        },
        {
          path: 'profile',
          name: 'User Profile',
          component: UserProfile
        }
      ]
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let currentUser = store.getters.isLoggedIn

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (!requiresAuth && currentUser) {
    next('/student')
  } else {
    next()
  }
})

export default router
