const express = require('express')
const app = express()
const router = express.Router()
const apiRoutes = express.Router()
const port = '9000'

const appData = require('./public/data.json')

router.get('/', function (req, res, next) {
  req.url = 'index.html'
  next()
})

apiRoutes.get('/api/slides', function (req, res) {
  res.json({
    errno: 0,
    data: appData.slides
  })
})
apiRoutes.get('/api/themes', function (req, res) {
  res.json({
    errno: 0,
    data: appData.themes
  })
})
apiRoutes.get('/api/categories', function (req, res) {
  res.json({
    errno: 0,
    data: appData.categories
  })
})
apiRoutes.get('/api/products', function (req, res) {
  res.json({
    errno: 0,
    data: appData.products
  })
})
apiRoutes.get('/api/product', function (req, res) {
  res.json({
    errno: 0,
    data: appData.products.filter((item) => { return item.id === req.query.id })[0]
  })
})

app.use(router)
app.use(apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return false
  }
})
