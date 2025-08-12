<template>
  <div class="header-info">
    <!-- 操作小图标 -->
    <div class="operation">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>
    <!-- 个人信息 -->
    <div class="info-form">
      <el-dropdown>
        <span class="info">
          <el-avatar :size="30" />
          <span class="name">{{ name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleDropClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { LOGIN_TOKEN } from '@/global/constants'
import cache from '@/utils/cache'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/store/login/login'

const router = useRouter()
const handleDropClick = function () {
  cache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
const loginStore = useLoginStore()
const name = loginStore.userInfo.name
</script>
<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
  .operation {
    display: inline-flex;
    span {
      display: flex;
      width: 40px;
      height: 35px;
      position: relative;
      align-items: center;
      justify-content: center;
      &:hover {
        background-color: #f2f2f2;
      }
    }
    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background-color: red;
      border-radius: 100%;
    }
  }
  .info-form {
    display: flex;
    align-items: center;
    :global(.el-dropdown-menu__item) {
      line-height: 36px !important;
      padding: 6px 22px;
    }
  }
  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 5px;
    cursor: pointer;
    .name {
      margin-left: 5px;
    }
  }
}
</style>
