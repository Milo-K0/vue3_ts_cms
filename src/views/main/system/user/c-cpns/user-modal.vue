<template>
  <div class="user-modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isNewRef ? '新建用户' : '修改用户信息'"
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
        <el-form-item v-if="isNewRef" label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="电话号" prop="cellphone">
          <el-input v-model="formData.cellphone" placeholder="请输入电话号" />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="formData.roleId" placeholder="请选择角色">
            <template v-for="item in entreRoles" :key="item.id">
              <el-option :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="departmentId">
          <el-select v-model="formData.departmentId" placeholder="请选择部门">
            <template v-for="item in entreDepartments" :key="item.id">
              <el-option :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { useMainStore } from '@/store/main/main'
import { useSystemStore } from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
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

const mainStore = useMainStore()
const { entreRoles, entreDepartments } = storeToRefs(mainStore)

let isNewRef = ref()
let newDataRef = ref()

const openCenterDialog = function (isNew: boolean, newData?: any) {
  centerDialogVisible.value = true
  isNewRef.value = isNew
  newDataRef.value = newData
  if (!isNew && newData) {
    // 是修改用户的弹框
    for (let key in formData) {
      formData[key] = newData[key]
    }
  } else {
    // 是新建用户的弹框
    for (let key in formData) {
      formData[key] = ''
    }
  }
}

const systemStore = useSystemStore()

const handleConfirmClick = function () {
  centerDialogVisible.value = false
  const submitData = {
    ...formData,
    cellphone: Number(formData.cellphone),
    roleId: Number(formData.roleId),
    departmentId: Number(formData.departmentId)
  }
  if (isNewRef.value) {
    mainStore.postNewUserDataActions(submitData)
    systemStore.postUsersListActions({ offset: 0, size: 10 })
  } else {
    mainStore.patchChangeUserDataActions(newDataRef.value.id, formData)
    systemStore.postUsersListActions({ offset: 0, size: 10 })
  }
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
