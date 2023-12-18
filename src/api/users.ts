import request from "@/utils/request"
import axios from "axios"

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
}

console.log(axios.defaults.headers.common['X-CSRF-TOKEN']);

// 用户请求登陆
export const login = (LoginInfo: LoginInfo) => {
    return request<LoginResult>({
        method: "POST",
        url: "/api/admin/user/login",
        data: LoginInfo,
        headers: {
            "X-CSRF-TOKEN": axios.defaults.headers.common['X-CSRF-TOKEN']
        }
    })
}