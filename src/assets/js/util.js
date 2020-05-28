export const storage = {
  get (key) {
    if (key === 'token') {
      return localStorage.getItem(key)
    } else {
      return JSON.parse(localStorage.getItem(key))
    }
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

export function isEmpty (e) {
  var t
  for (t in e) {
    return !1
  }
  return !0
}
