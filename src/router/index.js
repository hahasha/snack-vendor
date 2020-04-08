import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/pages/home/home'
import category from '@/pages/category/category'
import shopcart from '@/pages/shopcart/shopcart'
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
    path: '/shopcart',
    component: shopcart
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
