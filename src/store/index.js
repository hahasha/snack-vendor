import Vue from 'vue'
import Vuex from 'vuex'
import { store } from '@/assets/js/util.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    userList: store.get('userList') ? store.get('userList') : [],
    cartList: store.get('cartList') ? store.get('cartList') : [],
    addressList: store.get('addressList') ? store.get('addressList') : []
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
    },
    addAddress (state, address) {
      console.log(state.addressList)
      state.addressList.push(Object.assign(address, { id: state.addressList.length, isDelete: false }))
      console.log(state.addressList)
      store.set('addressList', state.addressList)
    },
    updateAddress (state, address) {
      const index = state.addressList.findIndex(item => { return item.id === address.id })
      if (index !== -1) {
        state.addressList.splice(index, 1, address)
      }
      store.set('addressList', state.addressList)
    },
    addUser (state, user) {
      state.userList.push(Object.assign(user, { id: state.userList.length, avatar_url: '' }))
      state.currentUser = user
      store.set('userList', state.userList)
    },
    updateUser (state, user) {
      const index = state.userList.findIndex(item => { return item.id === user.id })
      if (index !== -1) {
        state.userList.splice(index, 1, user)
      }
      state.currentUser = user
      store.set('userList', state.userList)
    },
    switchAccount (state, user) {
      state.currentUser = user
    }
  },
  actions: {
  },
  modules: {
  }
})
