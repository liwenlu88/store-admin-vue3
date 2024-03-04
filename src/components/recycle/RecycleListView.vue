<script setup lang="ts">
import {deleteRecycle, getAllRecycleList, getAllRecycleType, restoreRecycle} from '@/api/recycle'
import type {AllRecycle} from '@/api/recycle'
import {Delete, RefreshRight} from '@element-plus/icons-vue'

const recycleList = ref<AllRecycle[]>([])
const name = ref('')
const type = ref('')
const pageSize = reactive({value: 10})
const total = ref(0)
const retrievalTime = ref<[Date, Date]>([
  new Date(new Date().setMonth(new Date().getMonth() - 1)),
  new Date()
])
const batchStatus = ref(true)

// 格式化日期
function formatLocalDate(date: Date) {
  const y = date.getFullYear()
  const m = (date.getMonth() + 1).toString().padStart(2, '0') // 月份从0开始，因此加1
  const d = date.getDate().toString().padStart(2, '0')
  const h = date.getHours().toString().padStart(2, '0')
  const i = date.getMinutes().toString().padStart(2, '0')
  const s = date.getSeconds().toString().padStart(2, '0')
  return `${y}-${m}-${d} ${h}:${i}:${s}`
}

// 转换 retrievalTime 中的每个日期为指定格式的字符串
const formattedLocalRetrievalTimes = retrievalTime.value.map(date => formatLocalDate(date))

// 处理获取列表 -- 条件查询 -- 分页
const getAllRecycle = async () => {
  const {data} = await getAllRecycleList({
    name: name.value,
    type: type.value,
    start_at: formattedLocalRetrievalTimes[0],
    end_at: formattedLocalRetrievalTimes[1],
    pageSize: pageSize.value,
    pageNum: 1
  })
  if (data.status == 200 && data.success == true) {
    recycleList.value = data.content.data
    total.value = data.content.total
  } else {
    ElMessage.error('获取回收站列表失败')
  }
}

getAllRecycle()

const recycleType = ref<string>()

// 获取回收站类型
const getRecycleType = async () => {
  const {data} = await getAllRecycleType()
  if (data.status == 200 && data.success == true) {
    recycleType.value = data.content
  } else {
    ElMessage.error('获取回收站类型失败' + data.message)
    return
  }
}

getRecycleType()

// 处理每页数量改变事件
const handleSizeChange = async (val: number) => {
  const {data} = await getAllRecycleList({
    name: name.value,
    type: type.value,
    pageSize: val,
    pageNum: 1
  })
  if (data.status == 200 && data.success == true) {
    recycleList.value = data.content.data
  } else {
    ElMessage.error('获取菜单失败' + data.message)
  }
}

// 处理页码改变事件
const handleCurrentChange = async (val: number) => {
  const {value: unwrappedPerPage} = toRefs(pageSize)
  const {data} = await getAllRecycleList({
    name: name.value,
    type: type.value,
    pageSize: unwrappedPerPage.value,
    pageNum: val
  })
  if (data.status == 200 && data.success == true) {
    recycleList.value = data.content.data
  } else {
    ElMessage.error('获取菜单失败' + data.message)
  }
}

// 查询按钮
const searchBtn = () => {
  getAllRecycle()
}

// 处理恢复
const handleRecover = async (id: number, label: string, item_id: number) => {
  // 调用恢复接口
  const {data} = await restoreRecycle([
    {
      id: id,
      label: label,
      item_id: item_id
    }
  ])

  if (data.status == 200 && data.success == true) {
    ElMessage.success('恢复成功')
    await getAllRecycle()
  } else {
    ElMessage.error('恢复失败' + data.message)
  }
}

// 处理删除
const handleDelete = async (id: number, label: string, item_id: number) => {
  // 调用删除接口
  const {data} = await deleteRecycle([
    {
      id: id,
      label: label,
      item_id: item_id
    }
  ])

  if (data.status == 200 && data.success == true) {
    ElMessage.success('删除成功')
    await getAllRecycle()
  } else {
    ElMessage.error('删除失败' + data.message)
  }
}

// 处理批量 删除 - 恢复 列表
const selectedRecycleList = ref<{ id: number, item_id: number }[]>([])

/**
 * 处理批量选择
 * @param val
 */
const handleSelectionChange = (val: { id: number, label: string, item_id: number }[]) => {
  selectedRecycleList.value = val.map(
      (item: { id: number; label: string; item_id: number }
      ) => {
        return {
          id: item.id, label: item.label, item_id: item.item_id
        }
      }
  )

  batchStatus.value = selectedRecycleList.value.length <= 0
}

// 处理批量恢复
const batchRecover = async () => {
  // 调用恢复接口
  const {data} = await restoreRecycle(selectedRecycleList.value)

  if (data.status == 200 && data.success == true) {
    ElMessage.success('恢复成功')
    await getAllRecycle()
  } else {
    ElMessage.error('恢复失败' + data.message)
  }
}

// 处理批量删除
const batchDelete = async () => {
  // 调用删除接口
  const {data} = await deleteRecycle(selectedRecycleList.value)

  if (data.status == 200 && data.success == true) {
    ElMessage.success('删除成功')
    await getAllRecycle()
  } else {
    ElMessage.error('删除失败' + data.message)
  }
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <div class="search">
          <el-date-picker
              v-model="retrievalTime"
              size="large"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              clearable
          />
          <el-input class="name" v-model="name" placeholder="请选择检索名" clearable/>
          <el-select v-model="type" placeholder="请选择检索类别" size="large" clearable>
            <el-option
                v-for="item in recycleType"
                :key="item"
                :label="item"
                :value="item"
            />
          </el-select>
          <el-button type="primary" @click="searchBtn" size="large">
            <el-icon>
              <Search/>
            </el-icon>
            查询
          </el-button>
        </div>
        <div class="button">
          <el-popconfirm title="恢复到原位置"
                         @confirm="batchRecover">
            <template #reference>
              <el-button type="info" size="large" :disabled="batchStatus">
                <el-icon>
                  <RefreshRight/>
                </el-icon>
                批量恢复
              </el-button>
            </template>
          </el-popconfirm>

          <el-popconfirm title="确定要删除吗？删除后不可恢复！"
                         @confirm="batchDelete">
            <template #reference>
              <el-button type="info" size="large" :disabled="batchStatus">
                <el-icon>
                  <Delete/>
                </el-icon>
                批量删除
              </el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </template>

    <el-table
        :data="recycleList"
        stripe
        row-key="id"
        border
        highlight-current-row
        @selection-change="handleSelectionChange"
    >

      <el-table-column type="selection" align="center" width="55"/>
      <el-table-column type="index" flxed label="编号" align="center" width="100"/>
      <el-table-column flxed prop="name" label="菜单名称" align="center" sortable/>
      <el-table-column prop="label" label="标签" align="center" sortable/>
      <el-table-column prop="type" label="类别" align="center" sortable/>
      <el-table-column prop="created_at" label="删除时间" align="center" sortable/>

      <el-table-column flxed label="操作" align="center" v-slot="{ row }">

        <el-popconfirm title="恢复到原位置"
                       @confirm="() => handleRecover(row.id,row.label,row.item_id)">
          <template #reference>
            <el-button type="warning">恢复数据</el-button>
          </template>
        </el-popconfirm>

        <el-popconfirm title="确定要删除吗？删除后不可恢复！"
                       @confirm="() => handleDelete(row.id,row.label,row.item_id)">
          <template #reference>
            <el-button type="danger">彻底删除</el-button>
          </template>
        </el-popconfirm>

      </el-table-column>
    </el-table>

    <template #footer>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 50, 100]"
          v-model:page-size="pageSize.value"
          :total="total"/>
    </template>

  </el-card>
</template>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;

  .search {
    display: flex;

    & > * {
      margin: 0 10px;
    }
  }

  .name {
    width: 300px;
  }

  .el-select {
    width: 240px;
  }

  .el-button .el-icon {
    font-size: 20px;
    padding-right: 5px;
  }
}
</style>
