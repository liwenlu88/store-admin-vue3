import axios, { type AxiosRequestHeaders } from 'axios'
import { useUserTokenStore } from '@/stores/userloginToken'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_API as string
})

// 请求拦截器
request.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders
  }
  // 从本地存储中获取token 和user_id
  const store = useUserTokenStore()
  // 设置请求头
  config.headers.user_id = store.token.user_id
  config.headers.access_token = store.token.access_token

  return config
})

// message 返回值为 请先登录 时清空本地存储的useUserTokenStore() 中的token 并跳转到登录页面
request.interceptors.response.use((response) => {
  if (response.data.status === 401) {
    // 清空本地存储的useUserTokenStore() 中的token
    localStorage.clear()
    window.location.href = '/login'
    ElMessage.error('请先登录')
  }
  return response
})

export default request
