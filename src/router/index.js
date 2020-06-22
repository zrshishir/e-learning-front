import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import AuthHandler from '../views/auth/AuthHandler'
import Signin from '../views/auth/Signin'
import Signup from '../views/auth/Signup'
import Course from '../views/course/Course'
import Lesson from '../views/lesson/Lesson'
import Question from '../views/question/Question'
import Response from '../views/response/Response'
import UserCourse from '../views/user-course/UserCourse'
import Report from '../views/report/Report'

Vue.use(VueRouter)

  const routes = [
    { path: '/', name: 'About', component: About },
    //authentication
    { path: '/oauth2/callback', name: 'auth handler', component: AuthHandler},
    { path: '/signin', name: 'signin', component: Signin},
    { path: '/signup', name: 'signup', component: Signup},

    //course
    { path: '/course', name: 'Course', component: Course},
    //lesson
    { path: '/lesson', name: 'Lesson', component: Lesson},
    //question
    { path: '/question', name: 'Question', component: Question},

    //question
    { path: '/response', name: 'Response', component: Response},

    //question
    { path: '/user-course', name: 'UserCourse', component: UserCourse},

    //report
    { path: '/report', name: 'Report', component: Report},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
