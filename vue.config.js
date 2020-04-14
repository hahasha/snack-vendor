const path = require('path')
const appData = require('./public/data.json')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    // api接口mock
    before(app) {
      app.get('/api/slides', function(req, res) {
        res.json({
          errno: 0,
          data: appData.slides
        })
      })
      app.get('/api/themes', function(req, res) {
        res.json({
          errno: 0,
          data: appData.themes
        })
      })
      app.get('/api/categories', function(req, res) {
        res.json({
          errno: 0,
          data: appData.categories
        })
      })
      app.get('/api/products', function(req, res) {
        res.json({
          errno: 0,
          data: appData.products
        })
      })
      app.get('/api/product', function(req, res) {
        res.json({
          errno: 0,
          data: appData.products.filter((item) => { return item.id === req.query.id })[0]
        })
      })
    }
  },
  chainWebpack (config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('pages', resolve('src/pages'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
  }
}
