<script setup lang="ts">
import AppAside from '@/components/layout/AppAside.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <AppAside />
      <div class="header-and-main">
        <AppHeader />
        <el-main>
          <el-scrollbar>
            <RouterView />
          </el-scrollbar>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.header-and-main {
  width: 100%;
  flex-direction: column;

  .el-main {
    overflow: auto;
    height: calc(100vh - 75px);
  }

}
</style>