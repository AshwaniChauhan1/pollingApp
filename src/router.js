import Vue from 'vue'
import Router from 'vue-router'
import home from './components/home.vue'
import create from './components/create.vue'
import views from './components/views.vue'
import take from './components/take.vue'
import login from './components/login.vue'
import signup from './components/signup.vue'
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    { path: '/', component: home, },
    { path: '/create', component: create, },
    { path: '/view', component: views, },
    { path: '/take', component: take, },
    { path: '/signup', component: signup, },
    { path: '/login', component: login }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' && localStorage.getItem('token') === "") {
    next({ path: "/login" });
  } else {
    next()
  }
})
export default router