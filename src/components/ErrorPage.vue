<script setup lang="ts">

</script>

<template>
    <!-- 生成404-Error报错页面代码 -->
    <div class="error-page">
        <el-row>
            <el-col :span="24">
                <h1>404-not found</h1>
                <h3>抱歉，您访问的页面不存在</h3>
                <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="scss" scoped>
.error-page {
    font-size: 32px;
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
