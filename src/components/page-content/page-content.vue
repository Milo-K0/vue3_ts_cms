<template>
  <div class="page-content">
    <div class="header">
      <h3 class="title">{{ contentConfig.header?.title }}</h3>
      <el-button type="primary" @click="handleNewUserClick">{{
        contentConfig.header?.btnTitle
      }}</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">{{
                FormatUtc(scope.row.createAt)
              }}</template></el-table-column
            >
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                <el-button
                  size="small"
                  icon="Edit"
                  type="primary"
                  text
                  @click="handleChangeClick(scope.row)"
                  >编辑
                </el-button>
                <el-button
                  size="small"
                  icon="Delete"
                  type="danger"
                  text
                  @click="handleDeleteClick(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                <slot
                  :name="item.slotName"
                  v-bind="scope"
                  :prop="item.prop"
                ></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item" align="center"> </el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <pageModal ref="pageModalRef" />
  </div>
</template>
<script lang="ts" setup>
import { useSystemStore } from '@/store/main/system/system'
import { FormatUtc } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

onMounted(() => {
  console.log(contentConfig.propsList)
})

interface Iprops {
  contentConfig: {
    pageName: string
    header?: {
      title: string
      btnTitle: string
    }
    propsList: any[]
  }
}

const props = defineProps<Iprops>()

const contentConfig = props.contentConfig

const systemStore = useSystemStore()
const { pageList, pageTotalCount } = storeToRefs(systemStore)
const currentPage = ref(1)
const pageSize = ref(10)

const fetchPageListData = function (searchForm: any = {}) {
  const info = {
    size: pageSize.value,
    offset: (currentPage.value - 1) * pageSize.value,
    ...searchForm
  }
  systemStore.postPageListActions(contentConfig.pageName, info)
}
fetchPageListData()
const handleSizeChange = function () {
  fetchPageListData()
}
const handleCurrentChange = function () {
  fetchPageListData()
}

const handleDeleteClick = async function (id: number) {
  systemStore.deletePageByIdActions(contentConfig.pageName, id)
}

const emit = defineEmits(['handleNewOrChangeUserClick'])

const pageModalRef = ref<InstanceType<typeof PageModal>>()
const handleNewUserClick = function () {
  emit('handleNewOrChangeUserClick', true)
}

const handleChangeClick = function (newData: any) {
  emit('handleNewOrChangeUserClick', false, newData)
}

defineExpose({ fetchPageListData })
</script>
<style lang="less" scoped>
.page-content {
  background-color: #fff;
  margin-top: 10px;
  padding: 15px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .title {
      color: #333;
    }
  }
  .table {
    margin-top: 16px;
    :deep(.el-table__cell) {
      padding: 12px 0;
    }
  }
  .pagination {
    margin-top: 16px;
    display: flex;
    justify-content: end;
  }
}
</style>
