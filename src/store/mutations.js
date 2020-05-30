import * as types from './mutation-types'

const mutations = {
  // 存储登录状态
  [types.SET_TOKEN] (state, token) {
    state.token = token
    localStorage.setItem('token', JSON.stringify(token))
  },
  // 退出登录，清除token和userInfo
  [types.CLEAR_TOKEN] (state) {
    state.token = null
    state.userInfo = {}
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  },
  // 存储用户信息
  [types.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
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
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
  // 删除购物车商品
  [types.DELETE_CART] (state, product) {
    const index = state.cartList.findIndex(item => { return item.id === product.id })
    if (index !== -1) {
      state.cartList.splice(index, 1)
    }
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
  // 下单后清空购物车
  [types.DELETE_CART_CHECKED] (state) {
    var list = []
    state.cartList.forEach(item => {
      if (!item.isChecked) {
        list.push(item)
      }
    })
    state.cartList.splice(0, state.cartList.length, ...list)
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
  // 批量更新购物车
  [types.UPDATE_CART_ALL] (state, type) {
    state.cartList.forEach(item => {
      if (type === 'check') {
        item.isChecked = true
      } else if (type === 'unCheck') {
        item.isChecked = false
      }
    })
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
  // 修改地址的操作（是否可选）
  [types.SET_ADDRESS_SELECT] (state, addressSelect) {
    state.addressSelect = addressSelect
  }
}

export default mutations
