export const store = {
  get (key) {
    const data = JSON.parse(localStorage.getItem(key))
    return data
  },
  set (key, value) {
    if (!this.get(key)) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.removeItem(key)
      localStorage.setItem(key, JSON.stringify(value))
    }
  },
  remove (key) {
    if (this.get(key)) {
      localStorage.removeItem(key)
    }
  }
}

export function randomNum () {
  let randomNum = ''
  for (let i = 0; i < 6; i++) { // 在时间戳后面添加num位随机数
    randomNum += Math.floor(Math.random() * 10)
  }
  randomNum = new Date().getTime() + randomNum
  return randomNum
}
