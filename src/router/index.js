import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/pages/home/home'
import category from '@/pages/category/category'
import shopCart from '@/pages/shopCart/shopCart'
import userCenter from '@/pages/user-center/user-center'
import product from '@/pages/product/product'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: home
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/shopCart',
    component: shopCart
  },
  {
    path: '/userCenter',
    component: userCenter
  },
  {
    path: '/product/:id',
    component: product
  }
]

const router = new VueRouter({
  routes
})

export default router
