<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isFold ? '60px' : '240px'">
        <main-menu :isFold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px"
          ><main-header @menu-icon-click="handleMenuIconClick"
        /></el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'

const isFold = ref(false)
const handleMenuIconClick = function (paload: boolean) {
  isFold.value = paload
}
</script>
<style lang="less" scoped>
.main {
  height: 100%;
  .main-container {
    height: 100%;
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      cursor: pointer;
      background-color: #001529;
      transition: width 0.3s linear;
      scrollbar-width: none;
    }
    .el-header {
      background-color: #fff;
    }
    .el-main {
      background-color: #eee;
    }
  }
}
</style>
