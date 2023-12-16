import axios from 'axios'
import request from "@/utils/request"


// 获取csrfToken
let csrfToken = ""
axios.get("http://localhost:8000/csrf/token").then(res => {
    csrfToken = res.data
})

// 登陆接口的类型
type LoginInfo = {
    email: string
    password: string
    captcha: string
}

// 登陆接口的返回类型
type LoginResult = {
    status: number
    success: boolean
    message: string
    token: string
}

// 用户请求登陆
export const login = (LoginInfo: LoginInfo) => {
    return request<LoginResult>({
        method: "POST",
        url: "/admin/user/login",
        headers: {
            "csrfToken": csrfToken
        },
        data: LoginInfo,
    })
} 