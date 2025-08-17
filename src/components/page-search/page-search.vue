<template>
  <div class="page-search">
    <el-form label-width="75" :model="searchForm" ref="formRef">
      <el-row>
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option
                      :label="option.label"
                      :value="option.value"
                    ></el-option>
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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

interface IProps {
  searchConfig: {
    formItems: any[]
  }
}

const props = defineProps<IProps>()

const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}

const searchForm = reactive<any>(initialForm)

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
