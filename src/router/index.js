import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Auth/Login.vue'
import Student from '@/components/Student/Student.vue'
import CourseOverview from '@/components/Student/CourseOverview'
import UserProfile from '@/components/Student/UserProfile.vue'

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
      path: '/student',
      component: Student,
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
