<script setup lang="ts">
import { ref, toRefs, unref } from 'vue'
import { getAllMenuList, menuDeleteList } from '@/api/menus'
import type { AllMenu } from '@/api/menus'

const router = useRouter()
const menuList = ref([] as AllMenu[])
const pageSize = reactive({ value: 10 })
const total = ref(0)

// 处理获取所有菜单 -- 分页
const getAllMenu = async () => {
  const { data } = await getAllMenuList('All', pageSize.value, 1)
  if (data.status == 200 && data.success == true) {
    menuList.value = data.content.data
    total.value = data.content.total
  } else {
    ElMessage.error('获取菜单失败')
  }
}

getAllMenu()

// 处理每页数量改变事件
const handleSizeChange = async (val: number) => {
  const { data } = await getAllMenuList('All', val, 1)
  if (data.status == 200 && data.success == true) {
    menuList.value = data.content.data
  } else {
    ElMessage.error('获取菜单失败')
  }
}

// 处理页码改变事件
const handleCurrentChange = async (val: number) => {
  const { value: unwrappedPerPage } = toRefs(pageSize)
  const { data } = await getAllMenuList('All', unref(unwrappedPerPage), val)
  if (data.status == 200 && data.success == true) {
    menuList.value = data.content.data
  } else {
    ElMessage.error('获取菜单失败')
  }
}

// 处理删除菜单事件
const confirmEvent = async (id: number) => {
  await handleDelete(id)
}

// 删除菜单 -- 软删除
const handleDelete = async (id: number) => {
  const { data } = await menuDeleteList(id)
  if (data.status == 200 && data.success == true) {
    ElMessage.success(data.message)
    await getAllMenu()
  } else {
    ElMessage.error('删除失败' + data.content)
  }
}

</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button type="primary" @click="router.push({name:'menu-create'})">添加菜单</el-button>
      </div>
    </template>

    <el-table
      :data="menuList"
      stripe
      row-key="id"
      border
      highlight-current-row
    >
      <el-table-column type="index" label="编号" align="center" width="120" />
      <el-table-column prop="name" label="菜单名称" align="center" sortable />
      <el-table-column prop="url" label="链接地址" align="center" />
      <el-table-column prop="icon" label="图标" align="center" />
      <el-table-column prop="level" label="层级" align="center" width="120" />
      <el-table-column prop="order" label="排序" align="center" width="120" />
      <el-table-column prop="is_visible" label="状态" align="center" width="120" />
      <el-table-column prop="is_deleted" label="软删除" align="center" width="120" />
      <el-table-column prop="updated_at" label="更新时间" align="center" sortable />
      <el-table-column label="操作" width="160" align="center" v-slot="{ row }">
        <el-button type="primary" @click="router.push({name:'menu-edit',params:{id:row.id}})">
          编辑
        </el-button>
        <el-popconfirm
          confirm-button-text="Yes"
          cancel-button-text="No"
          @confirm="confirmEvent(row.id)"
          title="确定要删除吗?"
        >
          <template #reference>
            <el-button type="danger">删除</el-button>
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
        :total="total" />
    </template>

  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
