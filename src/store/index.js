import Vue from 'vue'
import Vuex from 'vuex'
import { store } from '@/assets/js/util.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: store.get('cartList') ? store.get('cartList') : []
  },
  mutations: {
    updateCart (state, product) {
      const cartList = state.cartList
      const index = cartList.findIndex(item => { return item.id === product.id })
      if (index !== -1) {
        cartList.splice(index, 1, product)
      } else {
        cartList.push(product)
      }
      store.set('cartList', state.cartList)
    },
    updateAll (state, obj) {
      const key = Object.keys(obj)[0]
      const value = Object.values(obj)[0]
      state.cartList.forEach(item => {
        item[key] = value
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
