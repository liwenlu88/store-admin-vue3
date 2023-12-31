<script lang="ts" setup>
import type { UploadProps } from 'element-plus'
import { useUserTokenStore } from '@/stores/userloginToken'
import { useUserInfoStore } from '@/stores/userInfo'
import { updateUser } from '@/api/users'

const userStoreInfo = useUserInfoStore()

console.log(userStoreInfo.userInfo)

// 用户token store
const userStoreToken = useUserTokenStore()
const storeToken = reactive({
  user_id: userStoreToken.token.user_id,
  access_token: userStoreToken.token.access_token
})

// 图片的路径
const imageDirectory = ref('')
// 上传图片的url
const imageUrl = ref('')

// 上传成功后的回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (uploadFile) => {
  imageDirectory.value = uploadFile.content.path
  imageUrl.value = import.meta.env.VITE_BASE_API + imageDirectory.value
}

// 上传前的校验
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 大小不超过1MB
  if (rawFile.size / 1024 / 1024 > 1) {
    ElMessage.error('图片文件不得大于1MB!')
    return false
  }
  return true
}

// 表单数据
const form = reactive({
  userId: 0,
  userAvatar: '',
  userEmail: '',
  userName: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 提交表单
const onSubmit = async () => {
  updateUser(form).then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <div class="container">
    <el-form :model="form" @keydown.enter="onSubmit" label-position="top" label-width="120px">
      <div class="center">
        <h2 class="form-title">
          <span>个人信息修改</span>
        </h2>

        <el-upload class="avatar-uploader" :headers="{
          user_id: storeToken.user_id,
          access_token: storeToken.access_token,
          'file-directory': 'avatar'
        }" action="http://localhost:8000/api/admin/upload/image" accept=".jpg,.png,.jpeg,.ico" :show-file-list="false"
          :auto-upload="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="" />

          <el-icon v-else class="avatar-uploader-icon">
            <i-ep-plus />
          </el-icon>
        </el-upload>

        <el-form-item label="邮箱">
          <el-input disabled v-model="form.userEmail" />
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="form.userName" placeholder="输入用户名" clearable />
        </el-form-item>

        <el-form-item label="旧密码">
          <el-input v-model="form.oldPassword" type="password" placeholder="输入旧密码" clearable show-password />
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newPassword" type="password" placeholder="输入新密码" clearable show-password />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.confirmPassword" type="password" placeholder="确认新密码" clearable show-password />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  margin: 30px auto;
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;

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
      overflow: hidden;
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
      width: 178px;
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
