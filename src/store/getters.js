export const cartList = state => state.cartList

export const checkedCartList = state => state.cartList.filter(item => item.isChecked === true)

export const totalCount = state => state.cartList.filter(item => item.isChecked === true).reduce((prev, cur) => {
  return prev + cur.count
}, 0)

export const totalPrice = state => state.cartList.filter(item => item.isChecked === true).reduce((prev, cur) => {
  return prev + cur.count * Number(cur.price)
}, 0)
