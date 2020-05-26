import { get, post } from './http'

// 获取轮播图
export const getBanners = params => get('/v1/banner', params)
// 获取主题
export const getThemes = params => get('/v1/theme', params)
// 获取新品
export const getNewProducts = params => get('/v1/product/new', params)
// 获取分类详情
export const getCategories = params => get('/v1/category/detail', params)
// 获取商品详情
export const getProductById = params => get('/v1/product/detail', params)
// 登录
export const login = params => post('/v1/user/login', params)
// 获取用户收货地址
export const getAddress = params => get('/v1/user/address', params)
// 删除收货地址
export const deleteAddress = params => post('/v1/user/address/delete', params)
// 更新收货地址
export const updateAddress = params => post('/v1/user/address/update', params)

export const getThemeProduct = params => get('http://localhost:3000/product/themeById', params)
export const getProducts = params => get('http://localhost:3000/product/products', params)
export const loginOrRegister = params => post('http://localhost:3000/login', params)
