<template>
  <div class="pane-account">
    <el-form
      label-width="60px"
      :model="account"
      style="margin-top: 16px"
      :rules="accountRules"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" type="text" size="large" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          type="password"
          show-password
          size="large"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { ElForm, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useLoginStore } from '@/store/login/login'
import type { IAccount } from '@/types/login'

// 定义account数据
const account = reactive<IAccount>({
  name: '',
  password: ''
})
// 定义校验规则
const accountRules: FormRules = {
  name: [
    {
      required: true,
      message: '请输入账号信息~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9A-Z]{3,20}$/,
      message: '必须是3~20位长度的字母或数字组成',
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入您的密码~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9A-Z]{3,}$/,
      message: '密码长度必须由3位以上的数字或字母组成',
      trigger: 'change'
    }
  ]
}

// 那到当前form
const formRef = ref<InstanceType<typeof ElForm>>()

const handleLogin = function () {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password
      const loginStore = useLoginStore()
      loginStore.loginAccountAction({ name, password })
    } else {
      ElMessage.error('验证失败~')
    }
  })
}

defineExpose({
  handleLogin
})
</script>
<style lang="less" scoped>
.pane-account {
}
</style>
