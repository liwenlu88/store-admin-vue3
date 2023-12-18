<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { login } from '@/api/users';

// 表单默认数据
const form = reactive({
    email: '',
    password: '',
    captcha: '',
})

// 格式化验证码
const captchaUrl = ref(import.meta.env.VITE_BASE_API as string + `captcha?${Date.now()}`)

// 刷新验证码
const refreshCaptcha = () => {
    captchaUrl.value = import.meta.env.VITE_BASE_API as string + `captcha?${Date.now()}`
}

// 表单验证规则
const rules = reactive<FormRules>({
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/, message: '请输入正确的邮箱', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur' }
    ],
    captcha: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { min: 6, max: 6, message: '验证码长度为 6 个字符', trigger: 'blur' }
    ]
})

// 表单实例
const formRef = ref<FormInstance>()

// 表单提交
const onSubmit = async () => {
    // 表单验证
    await formRef.value?.validate().catch(err => {
        ElMessage.error('表单验证失败')
        throw err
    })

    // 表单验证成功
    const data = await login(form).then(res => {
        if (res.data.status === 200 && res.data.success === true) {
            ElMessage.success('登陆成功')
            console.log(res.data);
            return res.data
        } else {
            console.log(res.data);
            ElMessage.error(res.data.message)
            throw new Error(res.data.message)
        }
    })
}

// 表单重置
const onReset = () => {
    form.email = ''
    form.password = ''
    form.captcha = ''
}

</script>
<template>
    <div class="login-form">
        <el-form :model="form" label-width="120px" label-position="top" ref="formRef" :rules="rules" size="large">
            <h2 class="logo">
                <img src="@/assets/favicon.ico" alt="logo" />
                <span>后台管理系统</span>
            </h2>
            <el-form-item label="邮箱:" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input v-model="form.password" placeholder="请输入密码" show-password />
            </el-form-item>
            <el-form-item label="验证码:" prop="captcha">
                <div class="captcha">
                    <!-- 验证码输入框 -->
                    <el-input v-model="form.captcha" placeholder="请输入验证码" />

                    <!-- 验证码块 -->
                    <div class="captcha-block">
                        <img :src="captchaUrl" @click="refreshCaptcha" alt="captcha" />
                    </div>
                </div>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">登陆</el-button>
                <el-button type="warning" @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="scss" scoped>
.login-form {
    height: 100vh;
    margin: 0 auto;
    background-color: aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        width: 100%;
        background-color: #2B3E54;
        color: #FCFCFC;

        img {
            width: 32px;
            height: 32px;
        }
    }

    .el-form {
        width: 480px;
        padding: 30px;
        background-color: #fff;
        border-radius: 15px;

        .el-form-item {
            margin: 20px 0;
        }
    }

    // 验证码
    .captcha {
        display: flex;
        align-items: flex-start;

        .captcha-block {
            margin-left: 10px;

            img {
                width: 120px;
                height: 40px;
                cursor: pointer;
            }
        }
    }
}
</style>