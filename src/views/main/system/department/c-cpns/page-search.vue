<template>
  <div class="page-search">
    <el-form label-width="75" :model="searchForm" ref="formRef">
      <el-row>
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入部门名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上级部门" prop="parentId">
            <el-select v-model="searchForm.parentId" placeholder="请选择部门">
              <template v-for="item in entreDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input
              v-model="searchForm.leader"
              placeholder="请输入部门领导"
            />
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
        </el-col>
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
import { useMainStore } from '@/store/main/main'
import type { ElForm } from 'element-plus'
import { storeToRefs } from 'pinia'
import { onMounted, reactive, ref } from 'vue'

const mainStore = useMainStore()
const { entreDepartments } = storeToRefs(mainStore)

onMounted(() => {
  console.log(entreDepartments)
})

const searchForm = reactive<any>({
  name: '',
  leader: '',
  parentId: '',
  createAt: ''
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
.page-search {
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
