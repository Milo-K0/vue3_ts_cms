<template>
  <div class="user">
    <div class="search">
      <userSearch
        @search-click="handleSearchClick"
        @refresh-click="handleRefreshClick"
      />
    </div>
    <div class="content">
      <userContent ref="contentRef" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import { ref } from 'vue'
import type UserContent from './c-cpns/user-content.vue'
const contentRef = ref<InstanceType<typeof UserContent>>()
function handleSearchClick(searchForm: any) {
  contentRef.value?.fetchUsersListData(searchForm)
}
function handleRefreshClick() {
  contentRef.value?.fetchUsersListData()
}
</script>
<style lang="less" scoped>
.user {
  border-radius: 5px;
  overflow: hidden;
}
</style>
