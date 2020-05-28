const express = require('express')
const app = express()
const router = express.Router()
const port = '9000'

app.use(router)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return false
  }
  console.log('服务启动成功')
})
