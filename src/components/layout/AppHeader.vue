<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { isCollapse } from './isCollapse'
import { logout } from '@/api/users'
import { getUserInfo } from '@/api/users'
import { useUserInfoStore } from '@/stores/userInfo'
import router from '@/router'

// 用户信息store
const userStoreInfo = useUserInfoStore()


// 获取用户信息
getUserInfo().then(res => {
  // 用户信息存储到store中
  userStoreInfo.saveUserInfo((res.data as any).content)
})

// 用户信息 默认值
const userInfo = reactive({
  userName: computed(() => userStoreInfo.userInfo.user_name),
  avatar: computed(() => import.meta.env.VITE_BASE_API + userStoreInfo.userInfo.user_avatar)
})

// 跳转到用户信息页面
const user = () => {
  router.push({
    path: '/user'
  })
}

// 退出登陆
const logoutBtn = () => {
  logout().then(res => {
    if (res.data.status === 200) {
      // 清空本地存储的useUserTokenStore() 中的token
      localStorage.clear()
      window.location.href = '/login'
    }
  })
}

</script>

<template>
  <el-header>
    <!-- 图标 -->
    <el-icon :size="28" color="#999999b0" @click="isCollapse = !isCollapse">
      <i-ep-expand v-show="isCollapse" />
      <i-ep-fold v-show="!isCollapse" />
    </el-icon>

    <!-- 面包屑 -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>promotion management</el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 账户信息 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="50" :src="userInfo.avatar" />
        <el-icon class="el-icon--right">
          <i-ep-arrowDown />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="user">
            {{ userInfo.userName }}
          </el-dropdown-item>
          <el-dropdown-item divided @click="logoutBtn">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12);
  z-index: 1;

  // 面包屑
  .el-breadcrumb {
    margin-left: 20px;
  }

  // 头像
  .el-dropdown {
    margin-left: auto;

    .el-dropdown-link {
      display: flex;
      align-items: center;
      outline: none;
      cursor: pointer;

      .el-avatar {
        margin-right: 10px;
      }
    }
  }
}
</style>
