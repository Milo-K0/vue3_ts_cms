<template>
  <div class="main-menu">
    <!-- 头部标题logo -->
    <div class="menu-header">
      <img class="logo" src="../../assets/img/logo.png" alt="" />
      <h2 v-if="!isFold" class="title">米洛克管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        :collapse="isFold"
        default-active="39"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 字符串: el-icon-monitor => 组件 component动态组件 -->
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''">{{
                subItem.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useLoginStore } from '@/store/login/login'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
</script>
<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
  .menu-header {
    padding: 10px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .logo {
      width: 45px;
      height: 45px;
    }
    .title {
      font-weight: 900;
      margin-left: 10px;
      white-space: nowrap;
      overflow: hidden;
      font-size: 18px;
      color: #fff;
      user-select: none;
    }
  }
  .menu {
    .el-menu {
      border-right: none;
      user-select: none;
    }
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135;
    }
    .el-menu-item:hover {
      color: #fff;
    }
    .el-menu-item.is-active {
      background-color: #0a60bd;
    }
  }
}
</style>
