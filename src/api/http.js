import axios from 'axios'
import QS from 'qs'

const baseUrl = 'http://localhost:3000'
const baseImgUrl = 'http://localhost:3000/static/images'

export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(baseUrl + url, {
      params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(baseUrl + url, QS.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function upload (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(baseUrl + url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export {
  baseImgUrl,
  baseUrl
}
