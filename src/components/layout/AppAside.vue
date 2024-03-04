<script setup lang="ts">
import { isCollapse } from './isCollapse'
import { getAllMenuList } from '@/api/menus'
import type { AllMenu } from '@/api/menus'

const menuList = ref<AllMenu[]>([])

//  获取Aside菜单
const getAsideMenu = async () => {
  const { data } = await getAllMenuList('Aside', 0, 0)
  if (data.status == 200 && data.success == true) {
    menuList.value = data.content
  } else {
    ElMessage.error('获取菜单失败')
  }
}

getAsideMenu()

</script>

<template>
  <el-aside>
    <el-scrollbar>
      <el-menu router unique-opened :collapse="isCollapse" background-color="#36485D"
               text-color="#FCFCFC">
        <a href="/" class="logo">
          <img src="@/assets/favicon.ico" alt="" />
          <h1>后台管理</h1>
        </a>

        <template v-for="item in menuList" :key="item.id">
          <!-- 没有子菜单的选项 -->
          <template v-if="item.children.length == 0">
            <el-menu-item :index="item.url">
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>

          <!-- 有子菜单的选项 -->
          <template v-else>
            <el-sub-menu :index="item.url">
              <template #title>
                <el-icon>
                  <component :is="item.icon" />
                </el-icon>
                <span>{{ item.name }}</span>
              </template>
              <!-- 二级菜单 -->
              <template v-for="childItem in item.children" :key="childItem.id">
                <el-menu-item :index="childItem.url">
                  <el-icon>
                    <component :is="childItem.icon" />
                  </el-icon>
                  <span>{{ childItem.name }}</span>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
        </template>

      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
  padding-top: 20px;
  background-color: #2b3e54;
  height: 100vh;
  width: auto;

  .el-menu {
    background-color: #2b3e54;
    width: 260px;
    border: 0 #2b3e54;

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
    flex-direction: column;
    height: 60px;
    width: 100%;
    background-color: #2b3e54;
    color: #fcfcfc;
    margin-bottom: 20px;

    img {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
