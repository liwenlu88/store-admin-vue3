<script setup lang="ts">
import AppAside from '@/components/layout/AppAside.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
    <div class="common-layout">
        <el-container>
            <AppAside />
            <el-container class="header-main-footer">
                <AppHeader />
                <el-main>Main</el-main>
                <AppFooter />
            </el-container>
        </el-container>
    </div>
</template>


<style lang="scss" scoped>
.header-main-footer {
    flex-direction: column;
}
</style>