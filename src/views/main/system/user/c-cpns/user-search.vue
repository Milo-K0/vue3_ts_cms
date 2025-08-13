<template>
  <div class="user-search">
    <el-form label-width="75" :model="searchForm" ref="formRef">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input
              v-model="searchForm.cellphone"
              placeholder="请输入电话号码"
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select v-model="searchForm.enable" placeholder="请选择状态">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col> -->
      </el-row>
    </el-form>
    <div class="btns">
      <el-button icon="Refresh" type="primary" @click="handleRefreshClick"
        >重置</el-button
      >
      <el-button icon="Search" type="primary" @click="handleSearchClick"
        >查询</el-button
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const searchForm = reactive<any>({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: []
})

const emit = defineEmits(['searchClick', 'refreshClick'])

const formRef = ref<InstanceType<typeof ElForm>>()
const handleRefreshClick = function () {
  formRef.value?.resetFields()
  emit('refreshClick')
}
const handleSearchClick = function () {
  emit('searchClick', searchForm)
}
</script>
<style lang="less" scoped>
.user-search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 10px 20px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>
