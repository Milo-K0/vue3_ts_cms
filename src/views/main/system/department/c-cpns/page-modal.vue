<template>
  <div class="user-modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isNewRef ? '新建用户' : '修改用户信息'"
      width="500"
      center
    >
      <el-form :model="formData" label-width="80px" style="max-width: 600px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="上级部门id" prop="parentId">
          <el-select
            v-model="formData.parentId"
            placeholder="请选择部门"
            style="width: 100%"
          >
            <template v-for="item in entreDepartments" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="领导" prop="leader">
          <el-input v-model="formData.leader" placeholder="请输入领导姓名" />
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
  parentId: '',
  leader: ''
})

const mainStore = useMainStore()
const { entreDepartments } = storeToRefs(mainStore)

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
    ...formData
  }
  if (isNewRef.value) {
    mainStore.postNewPageDataActions('department', submitData)
    systemStore.postPageListActions('department', { offset: 0, size: 10 })
  } else {
    mainStore.patchChangePageDataActions(
      'department',
      newDataRef.value.id,
      formData
    )
    systemStore.postPageListActions('department', { offset: 0, size: 10 })
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
