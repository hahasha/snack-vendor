import { storage } from '@/assets/js/util.js'

const state = {
  token: storage.get('token') || '',
  cartList: storage.get('cartList') || []
}

export default state
