<script setup lang="ts">
const isCollapse = ref(false)
</script>

<template>
    <el-aside>
        <el-scrollbar>
            <el-menu router unique-opened :collapse="isCollapse">
                <a href="/" class="logo">
                    <img src="@/assets/favicon.ico" alt="">
                    <h1>商场后台管理</h1>
                </a>

                <el-sub-menu index="permissions">
                    <template #title>
                        <el-icon>
                            <i-ep-lock></i-ep-lock>
                        </el-icon>
                        <span>权限管理</span>
                    </template>
                    <!-- 二级菜单 -->
                    <el-menu-item index="/menus">
                        <el-icon>
                            <i-ep-grid></i-ep-grid>
                        </el-icon>
                        <span>菜单列表</span>
                    </el-menu-item>
                    <el-menu-item index="/roles">
                        <el-icon>
                            <i-ep-avatar></i-ep-avatar>
                        </el-icon>
                        <span>角色列表</span>
                    </el-menu-item>
                </el-sub-menu>

                <el-menu-item index="/stores">
                    <el-icon>
                        <i-ep-shop></i-ep-shop>
                    </el-icon>
                    <span>店铺管理</span>
                </el-menu-item>

                <el-menu-item index="/commodity">
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

                    <el-menu-item index="/advertisespace">
                        <el-icon>
                            <i-ep-LocationInformation />
                        </el-icon>
                        <span>广告位置</span>
                    </el-menu-item>

                    <el-menu-item index="/advertiselist">
                        <el-icon>
                            <i-ep-menu></i-ep-menu>
                        </el-icon>
                        <span>广告列表</span>
                    </el-menu-item>
                </el-sub-menu>

                <el-menu-item index="/users">
                    <el-icon>
                        <i-ep-user></i-ep-user>
                    </el-icon>
                    <span>用户管理</span>
                </el-menu-item>

            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
    background-color: #F0F0F0;
    height: 100vh;
    width: auto;

    .el-menu {
        background-color: #F0F0F0;
        width: 200px;

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
        background-color: #F0F0F0;
        color: #409EFF;

        img {
            width: 32px;
            height: 32px;
        }
    }
}
</style>