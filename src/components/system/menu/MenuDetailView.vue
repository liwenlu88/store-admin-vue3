<script setup lang="ts">
import { useRoute } from 'vue-router'
import { type AllMenu, menuDetail, getAllMenuList } from '@/api/menus'

const route = useRoute()
const menu_id = route.params.id

const menuDetailList = ref<AllMenu>({} as AllMenu)

// 获取菜单详情
const menuDetailData = async () => {
  const { data } = await menuDetail(menu_id)
  if (data.status == 200 && data.success == true) {
    menuDetailList.value = data.content
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

// 顶级菜单列表
const topMenus = computed(() => {
  return menuList.value.filter((item) => item.level == 0)
})
</script>

<template>
  <el-form :hide-required-asterisk="true"
           label-width="120px" size="large">

    <el-form-item label="菜单名称" prop="name" disabled>
      <el-input type="text" v-model="menuDetailList.name" placeholder="菜单名称" disabled />
    </el-form-item>

    <el-form-item label="菜单地址" prop="url" disabled>
      <el-input type="text" v-model="menuDetailList.url" placeholder="菜单地址" disabled />
    </el-form-item>

    <el-form-item label="菜单图标" prop="icon" disabled>
      {{ menuDetailList.icon }}
      <el-icon size="20">
        <component :is="menuDetailList.icon" />
      </el-icon>
    </el-form-item>

    <el-form-item label="菜单层级">
      <el-input-number type="number" v-model="menuDetailList.level" placeholder="菜单层级"
                       disabled />
    </el-form-item>

    <el-form-item label="上层菜单">
      <el-select v-model="menuDetailList.parent_id" placeholder="上层菜单" disabled>
        <el-option label="顶级菜单" :value="menuDetailList.parent_id" />
        <el-option v-for="item in topMenus" :key="item.id as number" :label="item.name"
                   :value="item.id" />
      </el-select>
    </el-form-item>

    <el-form-item label="是否显示">
      <el-switch v-model="menuDetailList.is_visible" :active-value="1"
                 :inactive-value="0" inline-prompt active-text="是" active-action-icon="View"
                 inactive-action-icon="Hide" inactive-text="否" disabled />
    </el-form-item>

    <el-form-item label="软删除">
      <el-switch v-model="menuDetailList.is_deleted" :active-value="1"
                 :inactive-value="0" inline-prompt active-text="是" active-action-icon="View"
                 inactive-action-icon="Hide" inactive-text="否" disabled />
    </el-form-item>

    <el-form-item label="菜单排序">
      <el-input-number type="number" v-model="menuDetailList.order" placeholder="排序" disabled />
    </el-form-item>

    <el-form-item label="软删除时间">
      <el-date-picker v-model="menuDetailList.deleted_at" type="datetime" placeholder="软删除时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss" disabled />
    </el-form-item>
    <el-form-item label="创建时间">
      <el-date-picker v-model="menuDetailList.created_at" type="datetime" placeholder="创建时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss" disabled />
    </el-form-item>
    <el-form-item label="更新时间">
      <el-date-picker v-model="menuDetailList.updated_at" type="datetime" placeholder="更新时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss" disabled />
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
