<script setup lang="ts">
import { useRoute } from 'vue-router'
import { type AllMenu, getAllMenuList, menuSave } from '@/api/menus'
import { menuDetail } from '@/api/menus'
import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router'

const route = useRoute()
const menu_id = route.params.id

const menuDetailList = ref<AllMenu>({} as AllMenu)

// 获取菜单详情
const menuDetailData = async () => {
  const { data } = await menuDetail(menu_id)
  if (data.status == 200 && data.success == true) {
    menuDetailList.value = data.content
    console.log(menuDetailList)
  } else {
    console.log('请求失败')
  }
}

menuDetailData()

// 一级菜单
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

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  url: [{ required: true, message: '请输入菜单路径', trigger: 'blur' }],
  icon: [{ required: true, message: '请选择菜单图标', trigger: 'blur' }],
  level: [{ required: true, message: '请选择菜单层级', trigger: 'blur' }]
})

// 顶级菜单列表
const topMenus = computed(() => {
  return menuList.value.filter((item) => item.level == 0)
})

const name = ref(menuDetailList.value.name)
const orderBy = ref<number>(menuDetailList.value.order)
const levelBy = ref<number>(menuDetailList.value.level)

// 选择上层菜单后 自动改变排序
const parentMenu = (value: number) => {
  if (value == 0) {
    orderBy.value = topMenus.value.length + 1
  } else {
    // 没有子菜单
    levelBy.value = 2
    if (menuList.value[value - 1].children.length == 0) {
      orderBy.value = 1
    } else {
      // 有子菜单
      orderBy.value = menuList.value[value - 1].children[menuList.value[value - 1].children.length - 1].order + 1
    }
  }
}

// 表单实例
const formRef = ref<FormInstance>()

const form = reactive({
  id: menu_id,
  name: name,
  url: menuDetailList.value.url,
  icon: menuDetailList.value.icon,
  level: levelBy,
  parent_id: menuDetailList.value.parent_id,
  is_visible: menuDetailList.value.is_visible,
  order: orderBy,
  is_delete: menuDetailList.value.is_deleted,
  deleted_at: null,
  created_at: menuDetailList.value.create_at,
  updated_at: menuDetailList.value.update_at
})

const onSubmit = async () => {
  await formRef.value?.validate().catch((err) => {
    // 抛出错误
    throw err
  })

  const { data } = await menuSave(form)
  if (data.status == 200 && data.success == true) {
    await router.push({ name: 'menu-list' })
    ElMessage.success('修改成功')
  } else {
    ElMessage.error('修改失败' + data.message)
  }
}

</script>

<template>
  <el-form :model="form" :hide-required-asterisk="true" :rules="rules" ref="formRef" label-width="120px" size="large">
    <el-form-item label="菜单名称" prop="name">
      <el-input type="text" v-model="form.name" placeholder="输入菜单名称" clearable />
    </el-form-item>

    <el-form-item label="菜单地址" prop="url">
      <el-input type="text" v-model="form.url" placeholder="输入菜单地址" clearable />
    </el-form-item>

    <el-form-item label="菜单图标" prop="icon">
      <icon-picker v-model="form.icon" />
    </el-form-item>

    <el-form-item label="上层菜单">
      <el-select v-model="form.parent_id" placeholder="选择上层菜单" @change="parentMenu">
        <el-option label="顶级菜单" value="0" />
        <el-option v-for="item in topMenus" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>

    <el-form-item label="是否显示">
      <el-switch v-model="form.is_visible" inline-prompt active-text="是" active-action-icon="View"
        inactive-action-icon="Hide" inactive-text="否" />
    </el-form-item>

    <el-form-item label="菜单排序">
      <el-input type="number" v-model="form.order" placeholder="排序" />
    </el-form-item>

    <el-form-item label="创建时间">
      <el-date-picker v-model="form.created_at" type="datetime" placeholder="创建时间" format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss" />
    </el-form-item>
    <el-form-item label="更新时间">
      <el-date-picker v-model="form.updated_at" type="datetime" placeholder="更新时间" format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss" />
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
