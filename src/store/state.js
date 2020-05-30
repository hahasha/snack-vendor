const state = {
  token: localStorage.getItem('token') || null,
  cartList: JSON.parse(localStorage.getItem('cartList')) || [],
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
  allChecked: false,
  addressSelect: false // 用来判断地址是否可选
}

export default state
