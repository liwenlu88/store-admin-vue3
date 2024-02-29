<script setup lang="ts">
import * as iconList from '@element-plus/icons-vue'

// 图标列表
const icons = ref(Object.keys(iconList))

// 选中的图标
const emit = defineEmits(['update:modelValue'])

// 接收属性，用于双向绑定
defineProps({
  modelValue: String
})

// 点击图标时触发
const handleChange = (icon: string) => {
  emit('update:modelValue', icon)
}
</script>

<template>
  <div class="confirm-icon">
    <!--选择下拉框-->
    <el-select :model-value="modelValue" placeholder="请选择图标" @change="handleChange" clearable>
      <el-option v-for="icon in icons" :key="icon" :label="icon" :value="icon">
        <!--自定义插槽,定制选项内容-->
        <template #default>
          <div class="confirm-icon-option">
            <el-icon :size="20">
              <component :is="icon" />
            </el-icon>
            <span>{{ icon }}</span>
          </div>
        </template>
      </el-option>
    </el-select>
  </div>
</template>

<style scoped lang="scss">
.confirm-icon {
  display: flex;
  align-items: center;
}

.confirm-icon-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
