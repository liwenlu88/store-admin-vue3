<script setup lang="ts">
import {getAllMenuList, menuDeleteList, menuSave} from '@/api/menus'
import type {AllMenu, menuSaveData} from '@/api/menus'

const router = useRouter()
const menuList = ref([] as AllMenu[])
const pageSize = reactive({value: 10})
const total = ref(0)
const orderSaveData = ref({} as menuSaveData)
const isVisibleData = ref({} as menuSaveData)
const isDeleteData = ref({} as menuSaveData)

// 处理获取所有菜单 -- 分页
const getAllMenu = async () => {
  const {data} = await getAllMenuList('All', pageSize.value, 1)
  if (data.status == 200 && data.success == true) {
    menuList.value = data.content.data
    total.value = data.content.total
  } else {
    ElMessage.error('获取菜单失败')
  }
}

getAllMenu()

// 顶级菜单列表
const topMenus = computed(() => {
  return menuList.value.filter((item) => item.level == 0)
})

// 处理每页数量改变事件
const handleSizeChange = async (val: number) => {
  const {data} = await getAllMenuList('All', val, 1)
  if (data.status == 200 && data.success == true) {
    menuList.value = data.content.data
  } else {
    ElMessage.error('获取菜单失败' + data.message)
  }
}

// 处理页码改变事件
const handleCurrentChange = async (val: number) => {
  const {value: unwrappedPerPage} = toRefs(pageSize)
  const {data} = await getAllMenuList('All', unref(unwrappedPerPage), val)
  if (data.status == 200 && data.success == true) {
    menuList.value = data.content.data
  } else {
    ElMessage.error('获取菜单失败' + data.message)
  }
}

// 排序更新
const orderSave = async (id: number, order: number) => {
  orderSaveData.value.id = id
  orderSaveData.value.order = order
  const {data} = await menuSave(orderSaveData.value)
  if (data.status == 200 && data.success == true) {
    await getAllMenu()
  }
}

// 状态更新
const isVisibleSave = async (id: number, isVisible: number) => {
  isVisibleData.value.id = id
  isVisibleData.value.is_visible = isVisible == 1
  const {data} = await menuSave(isVisibleData.value)
  if (data.status == 200 && data.success == true) {
    await getAllMenu()
  }
}

// 软删除
const confirmEvent = async (id: number) => {
  isDeleteData.value.id = id

  const {data} = await menuDeleteList(id)
  if (data.status == 200 && data.success == true) {
    ElMessage.warning('删除成功，进入回收站查看')
    await getAllMenu()
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
      <el-table-column type="index" flxed label="编号" align="center" width="100"/>
      <el-table-column flxed prop="name" label="菜单名称" align="center" width="200" sortable/>
      <el-table-column prop="url" label="链接地址" align="center" width="200"/>

      <el-table-column prop="icon" label="图标" align="center">
        <template #default="{row}">
          <el-icon v-if="row.icon" size="20">
            <component :is="row.icon"/>
          </el-icon>
        </template>
      </el-table-column>

      <el-table-column label="上层菜单" align="center" width="160">
        <template #default="{row}">
          <span v-if="row.parent_id == 0">顶级菜单</span>
          <span v-else v-for="item in topMenus" :key="item.id as number">
            {{ item.id == row.parent_id ? item.name : '' }}
          </span>
        </template>
      </el-table-column>

      <el-table-column prop="order" label="排序" align="center" width="180" v-slot="{row}">
        <el-input-number type="number" v-model="row.order"
                         @change="() => orderSave(row.id, row.order)"
                         placeholder="排序"/>
      </el-table-column>

      <el-table-column prop="is_visible" label="是否可见" align="center" v-slot="{row}">
        <el-switch
            v-model="row.is_visible"
            :active-value="1"
            :inactive-value="0"
            inline-prompt
            active-text="是"
            inactive-text="否"
            @change="()=>isVisibleSave(row.id, row.is_visible)"
        />
      </el-table-column>

      <el-table-column prop="updated_at" label="更新时间" width="200" align="center" sortable/>

      <el-table-column flxed label="操作" align="center" width="240" v-slot="{ row }">

        <el-button type="warning" @click="router.push({name:'menu-detail',params:{id:row.id}})">
          详情
        </el-button>

        <el-button type="primary" @click="router.push({name:'menu-edit',params:{id:row.id}})">
          修改
        </el-button>

        <el-popconfirm title="确定要删除吗?" @confirm="confirmEvent(row.id)">
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
          :total="total"/>
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
