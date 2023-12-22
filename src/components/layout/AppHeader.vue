<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { isCollapse } from './isCollapse'
import { getUserInfo } from '@/api/users'

// 用户信息 默认值
const userInfo = ref({
  avatar: '',
  userName: ''
})

// 获取用户信息
getUserInfo().then(res => {
  userInfo.value = res.data.content
})

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
          <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
          <el-dropdown-item divided>退出登陆</el-dropdown-item>
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
