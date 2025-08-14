<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建数据</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column
          type="selection"
          width="40px"
          align="center"
        ></el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="40px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="用户名"
          prop="name"
          width="110px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="真实姓名"
          prop="realname"
          width="110px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="手机号码"
          prop="cellphone"
          width="180px"
          align="center"
        ></el-table-column>
        <el-table-column label="状态" prop="enable" width="80px" align="center">
          <template #default="scope">
            <el-button
              size="small"
              :type="scope.row.enable ? 'primary' : 'danger'"
              plain
              >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createAt" align="center">
          <template #default="scope">{{
            FormatUtc(scope.row.createAt)
          }}</template></el-table-column
        >
        <el-table-column label="更新时间" prop="updateAt" align="center">
          <template #default="scope">{{
            FormatUtc(scope.row.updateAt)
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="170px" align="center">
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
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <userModal ref="userModalRef" />
  </div>
</template>
<script lang="ts" setup>
import { useSystemStore } from '@/store/main/system/system'
import { FormatUtc } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import userModal from './user-modal.vue'
import type UserModal from './user-modal.vue'

const systemStore = useSystemStore()
const { usersList, usersTotalCount } = storeToRefs(systemStore)
const currentPage = ref(1)
const pageSize = ref(10)
const fetchUsersListData = function (searchForm: any = {}) {
  const info = {
    size: pageSize.value,
    offset: (currentPage.value - 1) * pageSize.value,
    ...searchForm
  }
  systemStore.postUsersListActions(info)
}
fetchUsersListData()
const handleSizeChange = function () {
  fetchUsersListData()
}
const handleCurrentChange = function () {
  fetchUsersListData()
}

const handleDeleteClick = async function (id: number) {
  systemStore.deleteUsersByIdActions(id)
}

const userModalRef = ref<InstanceType<typeof UserModal>>()
const handleNewUserClick = function () {
  userModalRef.value?.openCenterDialog(true)
}

const handleChangeClick = function (newData: any) {
  userModalRef.value?.openCenterDialog(false, newData)
}

defineExpose({ fetchUsersListData })
</script>
<style lang="less" scoped>
.user-content {
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
