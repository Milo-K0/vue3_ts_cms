<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="20">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="container">
      <div class="breadcrumb">面包屑</div>
      <div class="info"><header-info /></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import headerInfo from './c-cpns/header-info.vue'

const emit = defineEmits(['menu-icon-click'])

const isFold = ref<boolean>(false)
const handleMenuIconClick = function () {
  isFold.value = !isFold.value
  emit('menu-icon-click', isFold.value)
}
</script>
<style lang="less" scoped>
.main-header {
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .container {
    margin: 0;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
    flex: 1;
  }
}
</style>
