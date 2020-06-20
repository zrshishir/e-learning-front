import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import AuthHandler from '../views/auth/AuthHandler'
import Signin from '../views/auth/Signin'
import Signup from '../views/auth/Signup'
import Course from '../views/course/Course'
import Lesson from '../views/lesson/Lesson'
import Question from '../views/question/Question'

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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
