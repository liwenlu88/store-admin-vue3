<script setup lang="ts">

</script>

<template>
    <el-footer>
        <div class="footer-content">
            <span>© 2023 肌无力猛男</span>
            <span>VueVersion:3.2.0</span>
            <span>PHPVersion:8.3.0</span>
            <span>MySQLVersion:8.2.0</span>
            <span>laravelVersion:10.x</span>
        </div>
    </el-footer>
</template>

<style lang="scss" scoped>
.el-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #999999;
    background-color: #fff;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.12);

    .footer-content {
        span {
            display: inline-block;
            margin: 0 10px;
        }
    }
}
</style>