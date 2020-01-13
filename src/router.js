import Vue from 'vue'
import Router from 'vue-router'
import index from './components/index.vue'
import create from './components/create.vue'
import views from './components/views.vue'
import take from './components/take.vue'
import login from './components/login.vue'
import signup from './components/signup.vue'
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      'path': '/',
      component: index,
      children: [
        { 'path': '/create', component: create, },
        { 'path': '/view', component: views, },
        { 'path': '/take', component: take, },
        { 'path': '/login', component: login, },
        { 'path': '/signup', component: signup, }
      ]
    }
  ]

})
export default router