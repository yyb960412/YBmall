import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('../views/category/Category.vue')
  },
  {
    path: '/shopcar',
    name: 'shopcar',
    component: () => import('../views/shopcar/ShopCar.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile/Profile.vue')
  },
  {
    path: '/detail/:iid',
    name: 'detail',
    component: () => import('../views/detail/Detail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
