export const storage = {
  get (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  set (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
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
