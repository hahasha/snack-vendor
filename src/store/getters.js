export const cartList = state => state.cartList

export const checkedCartList = state => state.cartList.filter(item => item.isChecked === true)

// 计算totalCount
export const totalCount = state => state.cartList.filter(item => item.isChecked === true).reduce((prev, cur) => {
  return prev + cur.count
}, 0)

// 计算totalPrice
export const totalPrice = state => state.cartList.filter(item => item.isChecked === true).reduce((prev, cur) => {
  return prev + cur.count * Number(cur.price)
}, 0)

export const userInfo = state => state.userInfo
