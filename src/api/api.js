import { get, post, upload } from './http'

// 获取轮播图
export const getBanners = params => get('/v1/banner', params)
// 获取专题
export const getThemes = params => get('/v1/theme', params)
// 获取专题详情
export const getThemeById = params => get('/v1/theme/detail', params)
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
// 获取用户默认收货地址
export const getDefault = params => get('/v1/user/address/default', params)
// 删除收货地址
export const deleteAddress = params => post('/v1/user/address/delete', params)
// 更新收货地址
export const updateAddress = params => post('/v1/user/address/update', params)
// 添加收货地址
export const addAddress = params => post('/v1/user/address/add', params)
// 上传头像
export const uploadAvatar = params => upload('/v1/image/upload', params)
// 重置密码
export const resetPassword = params => post('/v1/user/resetPassword', params)
// 修改用户信息
export const updateUserInfo = params => post('/v1/user/update', params)
