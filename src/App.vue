<script setup lang="ts">
import { RouterView } from 'vue-router'
import request from '@/utils/request'

request({
  method: 'get',
  url: 'test',
}).then((res) => {
  console.log(res)
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
