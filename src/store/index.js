import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    updateCart (state, product) {
      const cartList = state.cartList
      const index = cartList.findIndex(item => { return item.id === product.id })
      if (index !== -1) {
        cartList[index] = product
      } else {
        cartList.push(product)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
