import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import Login from '@/components/Auth/Login.vue'
import Student from '@/components/Student/Student.vue'
import Lecturer from '@/components/Lecturer/Lecturer.vue'
import StudentCourseOverview from '@/components/Student/CourseOverview'
import LecturerCourseOverview from '@/components/Lecturer/CourseOverview'
import StudentProfile from '@/components/Student/UserProfile.vue'
import LecturerProfile from '@/components/Lecturer/UserProfile.vue'
import Admin from '@/components/Admin/Admin.vue'
import ManageAccounts from '@/components/Admin/Accounts/ManageAccounts'
import ManageCourses from '@/components/Admin/Courses/ManageCourses'
import ManageForm from '@/components/Admin/Form/ManageForm'

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
          path: '/',
          redirect: 'dashboard'
        },
        {
          path: 'dashboard',
          name: 'Course Overview ',
          component: StudentCourseOverview,
          meta: { requiresAuth: true },
          beforeEnter (to, from, next) {
            let role = localStorage.getItem('roleStatus')
            if (role === 'Student') {
              next()
            } else {
              next('/')
            }
          }
        },
        {
          path: 'profile',
          name: 'User Profile ',
          component: StudentProfile,
          meta: { requiresAuth: true },
          beforeEnter (to, from, next) {
            let role = localStorage.getItem('roleStatus')
            if (role === 'Student') {
              next()
            } else {
              next('/')
            }
          }
        }
      ]
    },
    {
      path: '/lecturer',
      component: Lecturer,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          redirect: 'dashboard'
        },
        {
          path: 'dashboard',
          name: 'Course Overview',
          component: LecturerCourseOverview,
          meta: { requiresAuth: true },
          beforeEnter (to, from, next) {
            let role = localStorage.getItem('roleStatus')
            if (role === 'Lecturer') {
              next()
            } else {
              next('/')
            }
          }
        },
        {
          path: 'profile',
          name: 'User Profile',
          component: LecturerProfile,
          meta: { requiresAuth: true },
          beforeEnter (to, from, next) {
            let role = localStorage.getItem('roleStatus')
            if (role === 'Lecturer') {
              next()
            } else {
              next('/')
            }
          }
        }
      ]
    },
    {
      path: '/admin',
      component: Admin,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          redirect: 'accounts'
        },
        {
          path: 'accounts',
          name: 'Manage Account',
          component: ManageAccounts,
          meta: { requiresAuth: true },
          beforeEnter (to, from, next) {
            let role = localStorage.getItem('roleStatus')
            if (role === 'Admin') {
              next()
            } else {
              next('/')
            }
          }
        },
        {
          path: 'courses',
          name: 'Manage Courses',
          component: ManageCourses,
          meta: { requiresAuth: true },
          beforeEnter (to, from, next) {
            let role = localStorage.getItem('roleStatus')
            if (role === 'Admin') {
              next()
            } else {
              next('/')
            }
          }
        },
        {
          path: 'form',
          name: 'Manage Form',
          component: ManageForm,
          meta: { requiresAuth: true },
          beforeEnter (to, from, next) {
            let role = localStorage.getItem('roleStatus')
            if (role === 'Admin') {
              next()
            } else {
              next('/')
            }
          }
        }
      ]
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let isLoggedIn = store.getters.isLoggedIn
  if (requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (!requiresAuth && isLoggedIn) {
    let role = localStorage.getItem('roleStatus')
    if (role === 'Student') {
      next('/student')
    } else if (role === 'Lecturer') {
      next('/lecturer')
    } else if (role === 'Admin') {
      next('/admin')
    }
  } else {
    next()
  }
})

export default router
