import request from '@/utils/request'

// 公共的类型
type CommonResult<T = string> = {
  status: number
  success: boolean
  message: string
  content: T
}

// 登陆接口的类型
type LoginInfo = {
  email: string
  password: string
  captchaCode: string
  captchaKey: string
}

// 登陆接口的返回类型
type LoginResult = CommonResult

// 用户请求登陆
export const login = (LoginInfo: LoginInfo) => {
  return request<LoginResult>({
    method: 'POST',
    url: '/api/admin/user/login',
    data: LoginInfo
  })
}

// 退出登陆
export const logout = () => {
  return request({
    method: 'POST',
    url: '/api/admin/user/logout'
  })
}

// 获取用户信息的类型
type UserInfo = CommonResult<{
  avatar: string
  name: string
  email: string
  description: string
}>

// 获取用户信息
export const getUserInfo = () => {
  return request<UserInfo>({
    method: 'POST',
    url: '/api/admin/user/info'
  })
}

// 修改用户信息
export const updateUser = (data: any) => {
  return request({
    method: 'POST',
    url: '/api/admin/user/update',
    data: data
  })
}
