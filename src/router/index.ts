import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Open from '../views/open.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Open',
    component: Open
  },
  {
    path: '/open',
    name: 'Open',
    component: Open
  },
  {
    path: '/Desktop',
    name: 'Desktop',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/desktop.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
