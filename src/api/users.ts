import request from '@/utils/request'

// 登陆接口的类型
type LoginInfo = {
  email: string
  password: string
  captchaCode: string
  captchaKey: string
}

// 登陆接口的返回类型
type LoginResult = {
  status: number
  success: boolean
  message: string
  content: JSON
}

// 用户请求登陆
export const login = (LoginInfo: LoginInfo) => {
  return request<LoginResult>({
    method: 'POST',
    url: '/api/admin/user/login',
    data: LoginInfo
  })
}

// 获取用户信息的类型
type UserInfo = {
  status: number
  success: boolean
  message: string
  content: {
    avatar: string
    userName: string
  }
}

// 获取用户信息
export const getUserInfo = () => {
  return request<UserInfo>({
    method: 'POST',
    url: '/api/admin/user/info'
  })
}
