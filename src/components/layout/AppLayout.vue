<script setup lang="ts">
import AppAside from '@/components/layout/AppAside.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <AppAside />
      <el-container class="header-main-footer">
        <!-- 头部 -->
        <AppHeader />
        <!-- 主体 -->
        <el-main>
          <el-scrollbar>
            <RouterView />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style lang="scss" scoped>
.header-main-footer {
  flex-direction: column;
}

.el-main {
  padding-right: 0;
}
</style>
