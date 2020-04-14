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
    component: userCenter,
    children: [
      {
        path: 'aboutUs',
        component: aboutUs
      },
      {
        path: 'orders',
        component: orders
      },
      {
        path: 'collections',
        component: collections
      },
      {
        path: 'address',
        component: address
      }
    ]
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
