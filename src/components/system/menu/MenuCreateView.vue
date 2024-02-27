<script setup lang="ts">
import { getAllMenuList } from '@/api/menus'
import type { AllMenu } from '@/api/menus'

const menuList = ref([] as AllMenu[])
const getAllMenu = async () => {
  const { data } = await getAllMenuList('All', 0, 0)
  if (data.status == 200 && data.success == true) {
    menuList.value = data.content.data
  } else {
    ElMessage.error('获取菜单失败')
  }
}

getAllMenu()

// 顶级菜单列表
const topMenus = computed(() => {
  return menuList.value.filter((item) => item.level == 0)
})

const orderBy = ref()

watch(topMenus, () => {
  orderBy.value = topMenus.value.length + 1
})

// 选择上层菜单后 自动改变排序
const parentMenu = (value: number) => {
  if (value == 0) {
    orderBy.value = topMenus.value.length + 1
  } else {
    // 没有子菜单
    if (menuList.value[value - 1].children.length == 0) {
      orderBy.value = 1
    } else {
      // 有子菜单
      orderBy.value = menuList.value[value - 1].children[menuList.value[value - 1].children.length - 1].order + 1
    }
  }

}

const form = reactive({
  name: '',
  url: '',
  icon: '',
  parent_id: '0',
  is_visible: true,
  order: orderBy,
  created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
  updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
})

const onSubmit = () => {
  console.log(form)
}

</script>

<template>
  <el-form :model="form" label-width="120px" size="large">
    <el-form-item label="菜单名称">
      <el-input type="text" v-model="form.name" placeholder="输入菜单名称" clearable />
    </el-form-item>

    <el-form-item label="菜单地址">
      <el-input type="text" v-model="form.url" placeholder="输入菜单地址" clearable />
    </el-form-item>

    <el-form-item label="菜单图标">

    </el-form-item>

    <el-form-item label="菜单层级">
      <el-select v-model="form.parent_id" placeholder="选择上层菜单" @change="parentMenu">
        <el-option label="顶级菜单" value="0" />
        <el-option v-for="item in topMenus" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>

    <el-form-item label="是否显示">
      <el-switch v-model="form.is_visible" inline-prompt active-text="是"
                 active-action-icon="View"
                 inactive-action-icon="Hide"
                 inactive-text="否" />
    </el-form-item>

    <el-form-item label="菜单排序">
      <el-input type="number" v-model="form.order" placeholder="排序" />
    </el-form-item>

    <el-form-item label="创建时间">
      <el-date-picker
        v-model="form.created_at"
        type="datetime"
        placeholder="创建时间"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
    </el-form-item>
    <el-form-item label="更新时间">
      <el-date-picker
        v-model="form.updated_at"
        type="datetime"
        placeholder="更新时间"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
.el-form {
  margin-right: 40px;
  padding: 20px;
}

.el-button {
  width: 100px;
}
</style>
