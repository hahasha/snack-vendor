import { get } from './http'

const getSliders = get('/api/slides')
const getThemes = get('/api/themes')
const getCategories = get('/api/categories')
const getProducts = get('/api/products')
const getProductById = get('/api/product')

export {
  getSliders,
  getThemes,
  getCategories,
  getProducts,
  getProductById
}
