import request from "@/utils/request"

// 获取 CSRF 令牌
export const getCsrfToken = () => {
    return request({
        method: "get",
        url: "/front/csrf/token",
    })
}
