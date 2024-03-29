import { defineStore } from 'pinia'
import { ref } from 'vue'

interface UserInfo {
  id: number;
  name: string;
  email: string;
  avatar: string;
  description: string;
}

export const useUserInfoStore = defineStore('userInfo', () => {
  // 使用 ref 存储用户信息的 JSON 字符串
  const userInfoJson = ref('')

  // 使用 ref 存储解析后的用户信息
  const userInfo = ref<UserInfo>({ id: 0, name: '', email: '', avatar: '', description: '' })

  // 每次 userInfoJson 变化时，尝试解析它并更新 userInfo
  watch(userInfoJson, (newJson) => {
    try {
      userInfo.value = JSON.parse(newJson || window.localStorage.getItem('userInfo') || '{}')
    } catch (err) {
      ElMessage.error('json格式不正确')
      window.localStorage.setItem('userInfo', '') // 清空 localStorage userInfo
      throw err
    }
  }, { immediate: true })

  // 保存用户信息的函数
  function saveUserInfo(userinfo: UserInfo) {
    const newUserInfoJson = JSON.stringify(userinfo)
    userInfoJson.value = newUserInfoJson // 更新响应式数据
    window.localStorage.setItem('userInfo', newUserInfoJson) // 更新 localStorage
  }

  return {
    userInfo,
    saveUserInfo
  }
})
