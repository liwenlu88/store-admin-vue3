<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'

const isCollapse = ref(false)
</script>

<template>
    <el-header>
        <!-- 图标 -->
        <el-icon>
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
                <el-avatar :size="50" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
                <el-icon class="el-icon--right">
                    <i-ep-arrowDown />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>账户信息</el-dropdown-item>
                    <el-dropdown-item divided>退出登陆</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </el-header>
</template>

<style lang="scss" scoped>
.el-header {
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