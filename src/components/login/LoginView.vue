<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '@/api/users'
import request from '@/utils/request'
import { useUserTokenStore } from '@/stores/userloginToken'

const router = useRouter()
const route = useRoute()

// 用户token store
const store = useUserTokenStore()

// 验证码
const captchaImg = ref('')
const captchaKey = ref('')

// 获取验证码
const updateCaptcha = () => {
  request({
    url: '/api/captcha_code',
    method: 'post'
  }).then((res) => {
    captchaImg.value = res.data.content.url.img
    captchaKey.value = res.data.content.url.key
  }).catch((err) => {
    console.log(err)
  })
}

// 初始化加载验证码
updateCaptcha()

// 刷新验证码
const refreshCaptcha = () => {
  updateCaptcha()
}

// 表单验证规则
const rules = reactive<FormRules>({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
      message: '请输入正确的邮箱',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur' }
  ],
  captchaCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 4, message: '验证码长度为 4 个字符', trigger: 'blur' }
  ]
})

// 表单默认数据
const form = reactive({
  email: '2816842036@qq.com',
  password: 'lwl20030608',
  captchaCode: '',
  captchaKey: captchaKey
})

// 表单重置
const onReset = () => {
  updateCaptcha()
  form.email = ''
  form.password = ''
  form.captchaCode = ''
  form.captchaKey = ''
}

// 登陆加载状态
const isLoading = ref(false)

// 表单实例
const formRef = ref<FormInstance>()

// 表单提交
const onSubmit = async () => {
  // 登陆加载状态
  isLoading.value = true

  // 表单验证
  await formRef.value?.validate().catch((err) => {
    // 刷新验证码
    updateCaptcha()
    // 清空验证码
    form.captchaCode = ''
    // 登陆加载状态
    isLoading.value = false
    // 抛出错误
    throw err
  })

  // 表单验证成功
  const data = await login(form).then((res) => {
    if (res.data.status == 200 && res.data.success == true) {
      ElMessage.success('登陆成功')
      return res.data
    } else {
      ElMessage.error(res.data.message)
      // 刷新验证码
      updateCaptcha()
      // 清空验证码
      form.captchaCode = ''
      // 登陆加载状态
      isLoading.value = false
      throw new Error(res.data.message)
    }
  })

  // 登陆加载状态 false可点击 true不可点击
  isLoading.value = false

  // 登陆成功 保存token信息
  store.saveToken((data as any).content)

  // 如果有重定向地址则跳转到重定向地址，否则跳转到首页
  await router.push((route.query.redirect as string) || '/')
}
</script>

<template>
  <div class="login-form">
    <el-form :model="form" :hide-required-asterisk="true" @keydown.enter="onSubmit"
             label-width="120px"
             label-position="top" ref="formRef" :rules="rules" size="large">
      <h2 class="logo">
        <img src="../../assets/favicon.ico" alt="logo" />
        <span>后台管理系统</span>
      </h2>

      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="密码:" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item label="验证码:" prop="captchaCode">
        <div class="captcha">
          <el-input v-model="form.captchaCode" placeholder="请输入验证码" />

          <el-input v-model="form.captchaKey" v-show="false" />

          <!-- 验证码块 -->
          <div class="captcha-block">
            <img :src="captchaImg" @click="refreshCaptcha" alt="captcha" />
          </div>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoading">登陆</el-button>
        <el-button type="warning" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login-form {
  height: 100vh;
  margin: 0 auto;
  background-color: aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 100%;
    background-color: #2b3e54;
    color: #fcfcfc;

    img {
      width: 32px;
      height: 32px;
    }
  }

  .el-form {
    width: 480px;
    padding: 30px;
    background-color: #fff;
    border-radius: 15px;

    .el-form-item {
      margin: 20px 0;
    }
  }

  // 验证码
  .captcha {
    display: flex;
    align-items: flex-start;

    .captcha-block {
      margin-left: 10px;

      img {
        width: 120px;
        height: 40px;
        cursor: pointer;
      }
    }
  }
}
</style>
