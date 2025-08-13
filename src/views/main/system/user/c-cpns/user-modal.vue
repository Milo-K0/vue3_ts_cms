<template>
  <div class="user-modal">
    <el-dialog
      v-model="centerDialogVisible"
      title="新建用户"
      width="500"
      center
    >
      <el-form :model="formData" label-width="80px" style="max-width: 600px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="电话号" prop="cellphone">
          <el-input v-model="formData.cellphone" placeholder="请输入电话号" />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-input v-model="formData.roleId" placeholder="请输入角色" />
        </el-form-item>
        <el-form-item label="部门" prop="departmentId">
          <el-input v-model="formData.departmentId" placeholder="请输入部门" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'

const centerDialogVisible = ref(false)

const formData = reactive({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

const openCenterDialog = function () {
  centerDialogVisible.value = true
}
defineExpose({ openCenterDialog })
</script>
<style lang="less" scoped>
.user-modal {
  .el-form {
    padding: 0 30px;
  }
}
</style>
