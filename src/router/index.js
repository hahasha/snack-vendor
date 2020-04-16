import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/pages/home/home'
import category from '@/pages/category/category'
import shopCart from '@/pages/shopCart/shopCart'
import userCenter from '@/pages/userCenter/userCenter'
import product from '@/pages/product/product'
import aboutUs from '@/pages/aboutUs/aboutUs'
import orders from '@/pages/orders/orders'
import collections from '@/pages/collections/collections'
import address from '@/pages/address/address'
import addAddress from '@/pages/addAddress/addAddress'
import editAddress from '@/pages/editAddress/editAddress'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: home
  },
  {
    name: 'category',
    path: '/category',
    component: category
  },
  {
    name: 'shopCart',
    path: '/shopCart',
    component: shopCart
  },
  {
    name: 'userCenter',
    path: '/userCenter',
    component: userCenter
  },
  {
    name: 'aboutUs',
    path: '/aboutUs',
    component: aboutUs
  },
  {
    name: 'orders',
    path: '/orders',
    component: orders
  },
  {
    name: 'collections',
    path: '/collections',
    component: collections
  },
  {
    name: 'address',
    path: '/address',
    component: address
  },
  {
    name: 'addAddress',
    path: '/addAddress',
    component: addAddress
  },
  {
    name: 'editAddress',
    path: '/editAddress',
    component: editAddress
  },
  {
    name: 'product',
    path: '/product/:id',
    component: product
  }
]

const router = new VueRouter({
  routes
})

export default router
