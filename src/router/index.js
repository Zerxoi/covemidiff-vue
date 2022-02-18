import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    redirect: "/emi"
  },
  {
    path: '/emi',
    name: 'emi',
    component: () => import("../views/EMI")
  },
  {
    path: '/diff',
    name: 'diff',
    component: () => import("../views/Diff")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
