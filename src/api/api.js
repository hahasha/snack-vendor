import { get, post } from './http'

// const getSliders = get('/api/slides')
const getSliders = params => get('http://localhost:3000/banners', params)
const getThemes = params => get('http://localhost:3000/product/theme', params)
const getproductTop = params => get('http://localhost:3000/product/productTop', params)
const getThemeProduct = params => get('http://localhost:3000/product/themeById', params)
const getCategories = params => get('http://localhost:3000/product/category', params)
const getProducts = params => get('http://localhost:3000/product/products', params)
const getProductById = params => get('http://localhost:3000/product/productById', params)
const loginOrRegister = params => post('http://localhost:3000/login', params)

export {
  getSliders,
  getThemes,
  getproductTop,
  getThemeProduct,
  getCategories,
  getProducts,
  getProductById,
  loginOrRegister
}
