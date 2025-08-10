<template>
  <div class="login-panel">
    <!-- 标题 -->
    <h2 class="title">可视化后台管理系统</h2>
    <!-- 表单 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane name="account">
          <template #label>
            <el-icon><User /></el-icon>
            <span style="margin-left: 3px">用户登录</span>
          </template>
          <paneAccount ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <el-icon><Iphone /></el-icon>
            <span style="margin-left: 3px">手机登录</span>
          </template>
          <panePhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 控制选项 -->
    <div class="control-account">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <!-- 登录按钮 -->
    <div class="login-btn">
      <el-button class="btn" type="primary" @click="handlerLoginClick"
        >立即登录</el-button
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import paneAccount from './pane-account.vue'
import panePhone from './pane-phone.vue'
import cache from '@/utils/cache'

const isRemPwd = ref(cache.getCache('isRemPwd') === 'true')

watch(isRemPwd, (newVal) => {
  cache.setCache('isRemPwd', newVal.toString())
})

const activeName = ref<string>('account')

const accountRef = ref<InstanceType<typeof paneAccount>>()

const handlerLoginClick = function () {
  if (activeName.value === 'account') {
    accountRef.value?.handleLogin(isRemPwd.value)
    if (isRemPwd.value) {
      console.log('记住账号和密码')
    }
  } else if (activeName.value === 'phone') {
    console.log('手机登录方式进行登录')
  }
}
</script>
<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  align-items: center;
  .title {
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: 900;
    text-align: center;
  }
  .control-account {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    .btn {
      width: 100%;
    }
  }
}
</style>
