import request from '@/utils/request'

// 公共的类型
type CommonResult<T = string> = {
  status: number
  success: boolean
  message: string
  content: T
}

// 所有数据
export type AllRecycle = {
  total: number
  id: number
  name: string
  label: string
  type: string
  item_id: number
  created_at: string
  updated_at: string
}

/**
 * 获取回收站列表 -- 模糊查询 -- 分页
 * @param QueryCondition
 */
export const getAllRecycleList = (QueryCondition: object) => {
  return request<CommonResult<AllRecycle>>({
    url: '/api/admin/recycle/list',
    method: 'post',
    data: QueryCondition
  })
}

/**
 * 获取所有回收类型
 */
export const getAllRecycleType = () => {
  return request<CommonResult>({
    url: '/api/admin/recycle/type_list',
    method: 'post'
  })
}

export const restoreRecycle = (recoverItem: Object) => {
  return request<CommonResult>({
    url: '/api/admin/recycle/restore',
    method: 'post',
    data: {
      data: recoverItem
    }
  })
}

export const deleteRecycle = (deleteItem: object) => {
  return request<CommonResult>({
    url: '/api/admin/recycle/delete',
    method: 'post',
    data: {
      data: deleteItem
    }
  })
}
