import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/emi',
    name: 'emi',
    component: () => import("../views/EMI")
  },
  {
    path: '/diff',
    name: 'diff',
    component: () => import("../views/Diff"),
    children: [
      {
        path: "/:taskId/:method",
        name: "diffTab",
        component: () => import("../views/DiffTab")
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
