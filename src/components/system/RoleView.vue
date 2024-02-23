<script lang="ts" setup>
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { useUserTokenStore } from '@/stores/userloginToken'
import { useUserInfoStore } from '@/stores/userInfo'
import { updateUser, verifyPassword, updatePassword } from '@/api/users'

// 用户token store
const userStoreToken = useUserTokenStore()
const storeToken = reactive({
  user_id: userStoreToken.token.user_id,
  access_token: userStoreToken.token.access_token
})

// 用户信息 store
const userStoreInfo = useUserInfoStore()

// 图片url
const imageUrl = ref(userStoreInfo.userInfo.avatar)

// 监听 Pinia store 中 userInfo.user_avatar 的变化
watch(
  [
    () => userStoreInfo.userInfo.avatar,
    () => userStoreInfo.userInfo.name,
    () => userStoreInfo.userInfo.description
  ],
  ([avatar, name, description]) => {
    // 这个回调将在 user_avatar 或 user_name 变化时触发
    imageUrl.value = avatar!
    // 你可以在这里添加处理 newUserName 的逻辑
    info.name = name!
    // 你可以在这里添加处理 newUserDec 的逻辑
    info.description = description!
  }
)

const infoRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 18, message: '用户名长度在 2 到 18 个字符', trigger: 'blur' }
  ],
  description: [
    { required: false, message: '请输入个人简介', trigger: 'blur' },
    { min: 0, max: 255, message: '个人简介长度在 0 到 255 个字符', trigger: 'blur' }
  ]
})

const pwdRules = reactive<FormRules>({
  oldPassword: [
    { required: false, message: '请输入旧密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur' }
  ]
})

// 上传前的校验
const beforeAvatarUpload = (rawFile) => {
  // 大小不超过1MB
  if (rawFile.size / 1024 / 1024 > 1) {
    ElMessage.error('图片文件不得大于1MB!')
    return false
  }
  return true
}

// 上传成功后的回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (uploadFile) => {
  // 上传成功后，将图片路径保存到响应式变量中
  info.avatar = uploadFile.content.path
  // 上传成功后，将图片路径保存到响应式变量中
  imageUrl.value = import.meta.env.VITE_BASE_API + uploadFile.content.path
}

// 密码输入框的禁用状态
const pwdState = ref(true)

// 表单数据
const info = reactive({
  id: computed(() => userStoreInfo.userInfo.id),
  avatar: userStoreInfo.userInfo.avatar,
  email: computed(() => userStoreInfo.userInfo.email),
  name: userStoreInfo.userInfo.name,
  description: userStoreInfo.userInfo.description
})

const pwd = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 表单实例
const formRef = ref<FormInstance>()

// 信息更新
const infoBtn = async () => {
  // 表单验证
  await formRef.value?.validate().catch((err) => {
    throw err
  })

  updateUser(info).then((res) => {
    if (res.data.status == 200 && res.data.success == true) {
      ElMessage.success('修改成功')
      // 更新localStorage中的用户信息
      userStoreInfo.saveUserInfo(res.data.content)
      // window.location.reload()
    } else {
      ElMessage.error(res.data.message)
    }
  })
}

// 旧密码验证
const oldPwd = async () => {
  // 表单验证
  await formRef.value?.validateField('oldPassword').catch((err) => {
    // 抛出错误
    throw err
  })

  const { data } = await verifyPassword(info.id, pwd.oldPassword)
  if (data.status == 200 && data.success == true) {
    // 解除密码输入框的禁用
    pwdState.value = false
  } else {
    ElMessage.error(data.message)
  }
}

// 修改密码
const pwdBtn = async () => {
  // 表单验证
  await formRef.value?.validateField('newPassword').catch((err) => {
    throw err
  })

  const { data } = await updatePassword(info.id, pwd.newPassword, pwd.newPassword, pwd.confirmPassword)
  if (data.status == 200 && data.success == true) {
    ElMessage.success(data.message)
    localStorage.clear()
    window.location.reload()
  } else {
    ElMessage.error(data.message)
  }
}

</script>

<template>
  <div class="container">
    <div class="user-left">
      <div class="info-box">
        <el-form :model="info" :rules="infoRules" :hide-required-asterisk="true"
                 label-position="top"
                 label-width="120px">
          <div class="center">
            <h2 class="form-title">
              <span>个人信息</span>
            </h2>

            <!-- 上传头像 -->
            <el-upload class="avatar-uploader" :headers="{
                            user_id: storeToken.user_id,
                            access_token: storeToken.access_token,
                            'file-directory': 'avatar'
                        }" action="http://localhost:8000/api/admin/upload/avatar"
                       accept=".jpg,.png,.jpeg,.ico"
                       :show-file-list="false" :auto-upload="true" :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="" />

              <el-icon v-else class="avatar-uploader-icon">
                <i-ep-plus />
              </el-icon>
            </el-upload>

            <el-form-item label="邮箱" prop="email">
              <el-input disabled v-model="info.email" />
            </el-form-item>

            <el-form-item label="用户名" prop="name">
              <el-input v-model="info.name" placeholder="输入用户名" clearable />
            </el-form-item>

            <el-form-item label="个人简介" prop="description">
              <el-input class="dec" type="textarea" placeholder="在这里输入个人简介"
                        v-model="info.description" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="infoBtn">保存</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>

    <div class="pwd-box">
      <el-form ref="form" :model="pwd" :rules="pwdRules" :hide-required-asterisk="true"
               label-position="top"
               label-width="120px">
        <div class="center">
          <h2 class="form-title">
            <span>修改密码</span>
          </h2>
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="pwd.oldPassword" type="password" placeholder="输入旧密码" clearable
                      show-password
                      @change="oldPwd" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input :disabled="pwdState" v-model="pwd.newPassword" type="password"
                      placeholder="输入新密码"
                      clearable show-password />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input :disabled="pwdState" v-model="pwd.confirmPassword" type="password"
                      placeholder="确认新密码"
                      clearable show-password />
          </el-form-item>
          <el-button type="primary" @click="pwdBtn">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 30px auto;
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;

  .dec {
    min-width: 480px;
  }

  .el-form {
    width: 720px;
    padding: 30px;
    background-color: #fff;
    border: 2px solid #ebeef5;
    border-radius: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .center {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .form-title {
      margin-bottom: 30px;
      text-align: center;
      font-size: 24px;
      font-weight: 600;
    }

    .avatar-uploader {
      width: 178px;
      height: 178px;
      display: flex;
      justify-content: space-around;
      overflow: hidden;
      border: 1px solid #ebeef5;
    }

    .avatar-uploader .el-upload {
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .avatar-uploader .avatar {
      width: auto;
      height: 178px;
      display: block;
    }

    .el-icon.avatar-uploader-icon {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }

  .el-input {
    --el-input-width: 480px;
  }
}
</style>
