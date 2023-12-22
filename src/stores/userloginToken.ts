import { defineStore } from 'pinia'

interface Token {
  user_id: number,
  access_token: string,
  expires_at: number
}

// 用户登陆token
export const useUserTokenStore = defineStore('userLoginToken', () => {

  // 定义token
  const tokenJson = ref('')

  // 计算属性token
  const token = computed<Token>(() => {
    try {
      return JSON.parse(tokenJson.value || window.localStorage.getItem('userLoginToken') || '{}')
    } catch (err) {
      ElMessage.error('json格式不正确')
      // 清空localStorage token
      window.localStorage.setItem('userLoginToken', '')
      throw err
    }
  })

  // 保存token
  function saveToken(token: Token) {
    tokenJson.value = JSON.stringify(token)
    // 保存到浏览器localStorage token
    window.localStorage.setItem('userLoginToken', tokenJson.value)
  }

  return {
    token,
    saveToken
  }
})
