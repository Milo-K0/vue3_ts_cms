<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建数据</el-button>
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
          width="120px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="状态"
          prop="enable"
          width="50px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="createAt"
          align="center"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateAt"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="170px" align="center">
          <el-button size="small" icon="Edit" type="primary" text
            >编辑</el-button
          >
          <el-button size="small" icon="Delete" type="danger" text
            >操作</el-button
          >
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">分页</div>
  </div>
</template>
<script lang="ts" setup>
import { useSystemStore } from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
const systemStore = useSystemStore()
systemStore.postUsersListRequest()
const { usersList } = storeToRefs(systemStore)
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
}
</style>
