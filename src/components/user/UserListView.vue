<script setup lang="ts">
import {getUserList, deleteUser} from '@/api/users'
import type {userList} from '@/api/users'

const router = useRouter()
const userListData = ref<userList[]>([])
const pageSize = reactive({value: 10})
const total = ref(0)
const name = ref('')
const email = ref('')
const retrievalTime = ref<[Date, Date]>([
  new Date(new Date().setMonth(new Date().getMonth() - 1)),
  new Date()
])

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

// 获取用户列表 -- 条件查询 -- 分页
const getAllUserList = async () => {
  const {data} = await getUserList({
    name: name.value,
    email: email.value,
    start_at: formattedLocalRetrievalTimes[0],
    end_at: formattedLocalRetrievalTimes[1],
    pageSize: pageSize.value,
    pageNum: 1
  })
  if (data.status == 200 && data.success == true) {
    userListData.value = data.content.data
    total.value = data.content.total
  } else {
    ElMessage.error('获取回收站列表失败')
  }
}

getAllUserList()

// 处理每页数量改变事件
const handleSizeChange = async (val: number) => {
  const {data} = await getUserList({
    name: name.value,
    email: email.value,
    start_at: formattedLocalRetrievalTimes[0],
    end_at: formattedLocalRetrievalTimes[1],
    page_size: val,
    page: 1
  })
  if (data.status == 200 && data.success == true) {
    userListData.value = data.content.data
  } else {
    ElMessage.error('获取菜单失败' + data.message)
  }
}

// 处理页码改变事件
const handleCurrentChange = async (val: number) => {
  const {value: unwrappedPerPage} = toRefs(pageSize)
  const {data} = await getUserList({
    name: name.value,
    email: email.value,
    start_at: formattedLocalRetrievalTimes[0],
    end_at: formattedLocalRetrievalTimes[1],
    page_size: unwrappedPerPage.value,
    page: val
  })
  if (data.status == 200 && data.success == true) {
    userListData.value = data.content.data
  } else {
    ElMessage.error('获取菜单失败' + data.message)
  }
}

// 查询按钮
const searchBtn = () => {
  getAllUserList()
}

// 软删除
const confirmEvent = async (id: number) => {
  const {data} = await deleteUser(id)
  if (data.status == 200 && data.success == true) {
    await getAllUserList()
    ElMessage.success('删除成功')
  } else {
    ElMessage.error('删除失败' + data.message)
  }
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-date-picker v-model="retrievalTime" size="large" type="datetimerange" range-separator="至"
                        start-placeholder="开始时间" end-placeholder="结束时间" clearable/>
        <el-input class="name" v-model="name" placeholder="请输入检索姓名" clearable/>
        <el-input class="email" v-model="email" placeholder="请输入检索邮箱" clearable/>

        <el-button type="primary" @click="searchBtn" size="large">
          <el-icon>
            <Search/>
          </el-icon>
          查询
        </el-button>
      </div>
    </template>

    <el-table :data="userListData" stripe row-key="id" border highlight-current-row>
      <el-table-column type="index" flxed label="编号" align="center" width="100"/>
      <el-table-column prop="name" label="姓名" align="center" sortable/>
      <el-table-column prop="email" label="email" align="center"/>
      <el-table-column prop="avatar" label="头像" align="center">
        <template #default="{ row }">
          <el-avatar :size="40" :src="row.avatar"/>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" align="center" sortable/>

      <el-table-column flxed label="操作" align="center" v-slot="{ row }">

        <el-button type="warning" @click="router.push({name:'user-detail',params:{id:row.id}})">
          详情
        </el-button>

        <el-button type="primary" @click="router.push({name:'user-edit',params:{id:row.id}})">
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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                     layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]"
                     v-model:page-size="pageSize.value" :total="total"/>
    </template>

  </el-card>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  width: 1100px;

  & > * {
    margin: 0 10px;
  }

  .name, .email {
    width: 300px;
  }


  .el-button .el-icon {
    font-size: 20px;
    padding-right: 5px;
  }
}
</style>
