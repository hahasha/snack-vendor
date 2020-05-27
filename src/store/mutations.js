import * as types from './mutation-types'
import { storage } from '@/assets/js/util.js'

const mutations = {
  // 存储登录状态
  [types.SET_TOKEN] (state, token) {
    state.token = token
    storage.set('token', token)
  },
  // 退出登录，清除token和userInfo
  [types.CLEAR_TOKEN] (state) {
    state.token = null
    state.userInfo = {}
    storage.remove('token')
    storage.remove('userInfo')
  },
  // 存储用户信息
  [types.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
    storage.set('userInfo', userInfo)
  },
  // 添加购物车
  [types.UPDATE_CART] (state, product) {
    if (state.cartList.length > 0) {
      // 判断该商品是否已加入购物车，如果已加入直接修改数量，否则添加商品
      const index = state.cartList.findIndex(item => { return item.id === product.id })
      if (index === -1) {
        state.cartList.push(product)
      } else {
        state.cartList.splice(index, 1, product)
      }
    } else {
      // 购物车为空，直接添加商品
      state.cartList.push(product)
    }
    storage.set('cartList', state.cartList)
  },
  // 删除购物车商品
  [types.DELETE_CART] (state, product) {
    const index = state.cartList.findIndex(item => { return item.id === product.id })
    if (index !== -1) {
      state.cartList.splice(index, 1)
    }
    storage.set('cartList', state.cartList)
  },
  // 批量更新购物车（全选）
  [types.UPDATE_CART_ALL] (state, type) {
    state.cartList.forEach(item => {
      switch (type) {
        case 'check': item.isChecked = true
          break
        case 'unCheck': item.isChecked = false
          break
      }
    })
    storage.set('cartList', state.cartList)
  }
}

export default mutations
