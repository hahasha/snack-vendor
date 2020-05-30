import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/pages/login/login'
import home from '@/pages/home/home'
import category from '@/pages/category/category'
import theme from '@/pages/theme/theme'
import shopCart from '@/pages/shopCart/shopCart'
import userCenter from '@/pages/userCenter/userCenter'
import product from '@/pages/product/product'
import aboutUs from '@/pages/aboutUs/aboutUs'
import collection from '@/pages/collection/collection'
import address from '@/pages/address/address'
import addAddress from '@/pages/address/addAddress'
import editAddress from '@/pages/address/editAddress'
import editUserInfo from '@/pages/user/editUserInfo'
import resetPassword from '@/pages/user/resetPassword'
import modifyName from '@/pages/user/modifyName'
import confirmOrder from '@/pages/order/confirmOrder'
import orderDetail from '@/pages/order/orderDetail'
import order from '@/pages/order/order'
import store from '../store'
import { storage } from '@/assets/js/util'

Vue.use(VueRouter)

const routes = [
  {
    name: 'login',
    path: '/login',
    component: login
  },
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
    name: 'theme',
    path: '/theme',
    component: theme
  },
  {
    name: 'product',
    path: '/product/:id',
    component: product
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
    name: 'order',
    path: '/order',
    component: order,
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    name: 'collection',
    path: '/collection',
    component: collection
  },
  {
    name: 'address',
    path: '/address',
    component: address,
    meta: {
      requireAuth: true
    },
    beforeEnter: (to, from, next) => {
      if (from.name === 'confirmOrder') {
        store.commit('SET_ADDRESS_SELECT', true)
      }
      next()
    }
  },
  {
    name: 'addAddress',
    path: '/addAddress',
    component: addAddress,
    meta: {
      requireAuth: true
    }
  },
  {
    name: 'editAddress',
    path: '/editAddress',
    component: editAddress,
    meta: {
      requireAuth: true
    }
  },
  {
    name: 'editUserInfo',
    path: '/editUserInfo',
    component: editUserInfo,
    meta: {
      requireAuth: true
    }
  },
  {
    name: 'resetPassword',
    path: '/resetPassword',
    component: resetPassword,
    meta: {
      requireAuth: true
    }
  },
  {
    name: 'modifyName',
    path: '/modifyName',
    component: modifyName,
    meta: {
      requireAuth: true
    }
  },
  {
    name: 'confirmOrder',
    path: '/confirmOrder',
    component: confirmOrder,
    meta: {
      requireAuth: true
    }
  },
  {
    name: 'orderDetail',
    path: '/orderDetail',
    component: orderDetail,
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = store.state.token || storage.get('token')
  if (to.meta.requireAuth && !token) { // 判断如果当前路由需要登录并且没有token
    next({
      path: '/login',
      query: { redirect: to.fullPath } // 将要跳转的路由作为参数，实现登录重定向
    })
  } else {
    next()
  }
})

// Uncaught (in promise) undefined
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
