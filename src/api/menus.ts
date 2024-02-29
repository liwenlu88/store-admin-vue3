import request from '@/utils/request'
import type { UnwrapNestedRefs } from 'vue'
import type { RouteParamValue } from 'vue-router'

// 公共的类型
type CommonResult<T = string> = {
  status: number
  success: boolean
  message: string
  content: T
}

// 菜单类型
export type AllMenu = {
  id: number
  name: string
  url: string
  icon: string
  level: number
  parent_id: number | string
  is_visible: boolean
  order: number
  is_deleted: boolean
  delete_at: Date | null
  create_at: Date
  update_at: Date
  children: AllMenu[]
}

/**
 * 获取所有菜单列表
 * @param type 菜单类型 Aside:侧边栏 All:所有
 * @param pageSize 每页显示数量
 * @param pageNum 页码
 */
export const getAllMenuList = (type: string, pageSize: any, pageNum: number) => {
  return request<CommonResult<AllMenu[]>>({
    url: '/api/admin/menu/list',
    method: 'post',
    data: {
      'type': type,
      'page_size': pageSize,
      'page': pageNum
    }
  })
}

export type menuSaveData = Partial<AllMenu>

/**
 * 保存菜单
 * @param menuInfo
 */
export const menuSave = (menuInfo: menuSaveData) => {
  return request<CommonResult>({
    url: '/api/admin/menu/save',
    method: 'post',
    data: menuInfo
  })
}

// 获取菜单详情
export const menuDetail = (id: string | RouteParamValue[]) => {
  return request<CommonResult<AllMenu>>({
    url: '/api/admin/menu/detail',
    method: 'post',
    data: {
      'id': id
    }
  })
}

// 删除菜单 -- 软删除
export const menuDeleteList = (id: number) => {
  return request<CommonResult>({
    url: '/api/admin/menu/delete',
    method: 'post',
    data: {
      'id': id
    }
  })
}
