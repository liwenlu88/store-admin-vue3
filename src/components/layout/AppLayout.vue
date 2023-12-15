<script setup lang="ts">
import AppAside from '@/components/layout/AppAside.vue'
</script>

<template>
    <div class="common-layout">
        <el-container>
            <AppAside />
            <el-container>
                <el-header>Header</el-header>
                <el-main>Main</el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>


<style lang="scss" scoped></style>