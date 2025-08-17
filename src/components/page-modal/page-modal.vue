<template>
  <div class="user-modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="
        isNewRef
          ? props?.modalConfig?.header?.newTitle
          : props?.modalConfig?.header?.changeTitle
      "
      width="500"
      center
    >
      <el-form :model="formData" label-width="80px" style="max-width: 600px">
        <template v-for="item in props?.modalConfig?.formData" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type === 'input'">
              <el-input
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
              ></el-input>
            </template>
            <template v-if="item.type === 'date-picker'">
              <el-date-picker
                v-model="formData[item.prop]"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </template>
            <template v-if="item.type === 'select'">
              <el-select
                v-model="formData[item.prop]"
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
        </template>
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
import { reactive, ref, watch } from 'vue'

const centerDialogVisible = ref(false)

interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      changeTitle: string
    }
    formData: any[]
  }
}

const props = defineProps<IProps>()

const formData = reactive({})

watch(
  () => props?.modalConfig?.formData,
  (newFormData) => {
    if (newFormData) {
      newFormData.forEach((item) => {
        formData[item.prop] = ''
      })
    }
  },
  {
    immediate: true
  }
)

const mainStore = useMainStore()

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
  const submitData = {
    ...formData
  }
  if (isNewRef.value) {
    mainStore.postNewPageDataActions(props.modalConfig.pageName, submitData)
    systemStore.postPageListActions(props.modalConfig.pageName, {
      offset: 0,
      size: 10
    })
  } else {
    mainStore.patchChangePageDataActions(
      props.modalConfig.pageName,
      newDataRef.value.id,
      formData
    )
    systemStore.postPageListActions(props.modalConfig.pageName, {
      offset: 0,
      size: 10
    })
  }
  centerDialogVisible.value = false
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
