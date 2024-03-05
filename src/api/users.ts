import request from '@/utils/request'

// 公共的类型
type CommonResult<T = string> = {
    status: number
    success: boolean
    message: string
    content: T
}

// 登陆接口的类型
type LoginInfo = {
    email: string
    password: string
    captchaCode: string
    captchaKey: string
}

// 登陆接口的返回类型
type LoginResult = CommonResult

// 用户请求登陆
export const login = (LoginInfo: LoginInfo) => {
    return request<LoginResult>({
        method: 'POST',
        url: '/api/admin/user/login',
        data: LoginInfo
    })
}

// 退出登陆
export const logout = () => {
    return request({
        method: 'POST',
        url: '/api/admin/user/logout'
    })
}

// 获取用户信息的类型
type UserInfo = CommonResult<{
    avatar: string
    name: string
    email: string
    description: string
}>

// 获取用户信息
export const getUserInfo = () => {
    return request<UserInfo>({
        method: 'POST',
        url: '/api/admin/user/info'
    })
}

// 修改用户信息
export const updateUser = (data: any) => {
    return request({
        method: 'POST',
        url: '/api/admin/user/update',
        data: data
    })
}

// 旧密码验证
export const verifyPassword = (id: number, oldPassword: string) => {
    return request({
        method: 'POST',
        url: '/api/admin/user/verify_password',
        data: {
            id: id,
            oldPassword: oldPassword
        }
    })
}

// 修改密码
export const updatePassword = (id: number, oldPassword: string, newPassword: string, confirmPassword: string) => {
    return request({
        method: 'POST',
        url: '/api/admin/user/update_password',
        data: {
            id: id,
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        }
    })
}

export type userList = {
    id: number
    name: string
    avatar: string
    email: string
    createTime: string
}

// 用户列表 -- 模糊查询 -- 分页
export const getUserList = (QueryCondition: object) => {
    return request<CommonResult<userList>>({
        method: 'POST',
        url: '/api/admin/user/list',
        data: QueryCondition
    })
}

//用户 软删除
export const deleteUser = (id: number) => {
    return request<CommonResult>({
        method: 'POST',
        url: '/api/admin/user/delete',
        data: {
            id: id
        }
    })
}
