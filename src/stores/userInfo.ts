import { defineStore } from 'pinia'

interface UserInfo {
  user_id: number
  user_name: string
  user_email: string
  user_avatar: string
}

export const useUserInfoStore = defineStore('userInfo', () => {
  // 定义用户信息
  const userInfoJson = ref('')

  const userInfo = computed<UserInfo>(() => {
    try {
      return JSON.parse(userInfoJson.value || window.localStorage.getItem('userInfo') || '{}')
    } catch (err) {
      ElMessage.error('json格式不正确')
      // 清空localStorage userInfo
      window.localStorage.setItem('userInfo', '')
      throw err
    }
  })

  // 保存用户信息
  function saveUserInfo(userinfo: UserInfo) {
    const newUserInfoJson = JSON.stringify(userinfo);
    userInfoJson.value = newUserInfoJson; // 更新响应式数据
    window.localStorage.setItem('userInfo', newUserInfoJson); // 更新 localStorage
  }

  return {
    userInfo,
    saveUserInfo
  }
})
