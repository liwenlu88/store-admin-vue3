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
    // 更新 form
    form.name = menuDetailList.value.name
    form.url = menuDetailList.value.url
    form.icon = menuDetailList.value.icon
    form.parent_id = menuDetailList.value.parent_id
    form.is_visible = menuDetailList.value.is_visible
    form.is_deleted = menuDetailList.value.is_deleted
    form.order = menuDetailList.value.order
    form.created_at = menuDetailList.value.created_at
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

const orderBy = ref<number>(menuDetailList.value.order)
const levelBy = ref<number>(menuDetailList.value.level)
const deleted_at = ref<string>(menuDetailList.value.deleted_at)

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

// 根据软删除状态调整 deleted_at
const isDeleteBy = (value: boolean | string | number) => {
  if (value) {
    deleted_at.value = new Date().toISOString().slice(0, 19).replace('T', ' ')
  } else {
    deleted_at.value = ''
  }
}

// 表单实例
const formRef = ref<FormInstance>()

const form = reactive({
  id: menu_id,
  name: '',
  url: '',
  icon: 'loading',
  level: levelBy,
  parent_id: 0,
  is_visible: true,
  is_deleted: false,
  order: orderBy,
  deleted_at: deleted_at,
  created_at: ''
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
  <el-form :model="form" :hide-required-asterisk="true" :rules="rules" ref="formRef"
           label-width="120px" size="large">

    <el-form-item label="菜单名称" prop="name">
      <el-input type="text" v-model="form.name" placeholder="输入菜单名称" clearable />
    </el-form-item>

    <el-form-item label="菜单地址" prop="url">
      <el-input type="text" v-model="form.url" placeholder="输入菜单地址" clearable />
    </el-form-item>

    <el-form-item label="菜单图标" prop="icon">
      <icon-picker v-model="form.icon" />
      <el-icon size="20">
        <component :is="form.icon" />
      </el-icon>
    </el-form-item>

    <el-form-item label="上层菜单">
      <el-select v-model="form.parent_id" placeholder="选择上层菜单" @change="parentMenu">
        <el-option label="顶级菜单" :value="form.parent_id" />
        <el-option v-for="item in topMenus" :key="item.id as number" :label="item.name"
                   :value="item.id" />
      </el-select>
    </el-form-item>

    <el-form-item label="是否显示">
      <el-switch v-model="form.is_visible" :active-value="1"
                 :inactive-value="0" inline-prompt active-text="是" active-action-icon="View"
                 inactive-action-icon="Hide" inactive-text="否" />
    </el-form-item>

    <el-form-item label="软删除">
      <el-switch v-model="form.is_deleted" :active-value="1"
                 :inactive-value="0" inline-prompt active-text="是" active-action-icon="View"
                 inactive-action-icon="Hide" inactive-text="否" @change="isDeleteBy" />
    </el-form-item>

    <el-form-item label="菜单排序">
      <el-input-number type="number" v-model="form.order" placeholder="排序" />
    </el-form-item>

    <el-form-item label="创建时间">
      <el-date-picker v-model="form.created_at" type="datetime" placeholder="创建时间"
                      format="YYYY-MM-DD HH:mm:ss"
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

  .el-icon {
    margin-left: 10px;
  }
}

.el-button {
  width: 100px;
}
</style>
