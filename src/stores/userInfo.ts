import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', () => {
  // 定义用户信息
  const userInfo = ref({
    userId: 0,
    userName: '',
    userEmail: '',
    avatar: ''
  })

  // 保存用户信息
  function saveUserInfo(user: any) {
    userInfo.value = user
  }

  return {
    userInfo,
    saveUserInfo
  }
})
