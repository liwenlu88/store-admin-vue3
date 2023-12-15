<script setup lang="ts">
import AppAside from '@/components/layout/AppAside.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
    <div class="common-layout">
        <el-container>
            <AppAside />
            <el-container class="header-main-footer">
                <AppHeader />
                <el-main>Main</el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>


<style lang="scss" scoped>
.header-main-footer {
    flex-direction: column;
}
</style>