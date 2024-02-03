<script setup lang="ts">
import { isCollapse } from './isCollapse'
</script>

<template>
  <el-aside>
    <el-scrollbar>
      <el-menu router unique-opened :collapse="isCollapse" background-color="#36485D" text-color="#FCFCFC">
        <a href="/" class="logo">
          <img src="@/assets/favicon.ico" alt="" />
          <h1>后台管理</h1>
        </a>

        <el-menu-item index="/shop/list">
          <el-icon>
            <i-ep-shop></i-ep-shop>
          </el-icon>
          <span>店铺管理</span>
        </el-menu-item>

        <el-menu-item index="/commodity/list">
          <el-icon>
            <i-ep-goods></i-ep-goods>
          </el-icon>
          <span>商品管理</span>
        </el-menu-item>

        <el-sub-menu index="advertise">
          <template #title>
            <el-icon>
              <i-ep-document></i-ep-document>
            </el-icon>
            <span>广告管理</span>
          </template>

          <el-menu-item index="/advertise/location">
            <el-icon>
              <i-ep-LocationInformation />
            </el-icon>
            <span>广告位置</span>
          </el-menu-item>

          <el-menu-item index="/advertise/list">
            <el-icon>
              <i-ep-menu></i-ep-menu>
            </el-icon>
            <span>广告列表</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/users/list">
          <el-icon>
            <i-ep-user></i-ep-user>
          </el-icon>
          <span>客户管理</span>
        </el-menu-item>

        <el-sub-menu index="system">
          <template #title>
            <el-icon>
              <i-ep-lock></i-ep-lock>
            </el-icon>
            <span>系统</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item index="/system/setting">
            <el-icon>
              <i-ep-LocationInformation />
            </el-icon>
            <span>设置</span>
          </el-menu-item>
          <el-menu-item index="/system/menus">
            <el-icon>
              <i-ep-grid></i-ep-grid>
            </el-icon>
            <span>菜单</span>
          </el-menu-item>
          <el-menu-item index="/system/roles">
            <el-icon>
              <i-ep-avatar></i-ep-avatar>
            </el-icon>
            <span>角色</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
  background-color: #2b3e54;
  height: 100vh;
  width: auto;

  .el-menu {
    background-color: #2b3e54;
    width: 260px;

    &.el-menu--collapse {
      width: 60px;

      & h1 {
        display: none;
      }
    }
  }

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
}
</style>
