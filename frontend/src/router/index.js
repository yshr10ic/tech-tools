import Vue from 'vue'
import VueRouter from 'vue-router'
import PasswordGenerator from '../views/PasswordGenerator.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: PasswordGenerator
  },
]

const router = new VueRouter({
  routes
})

export default router
