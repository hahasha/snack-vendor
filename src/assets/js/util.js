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
  }
}
