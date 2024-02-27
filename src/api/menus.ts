import request from '@/utils/request'

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
  parent_id: number
  order: number
  is_deleted: string
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

// 保存菜单
type saveMenuType = Pick<AllMenu, 'name' | 'url' | 'icon' | 'level' | 'parent_id' | 'order'
  | 'is_deleted' | 'delete_at' | 'create_at' | 'update_at'> & { id?: number }

/**
 * 保存菜单
 * @param menuInfo
 */
export const menuSave = (menuInfo: saveMenuType) => {
  return request<CommonResult>({
    url: '/api/admin/menu/save',
    method: 'post',
    data: menuInfo
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
