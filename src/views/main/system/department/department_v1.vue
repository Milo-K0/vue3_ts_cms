<template>
  <div class="department">
    <pageSearch
      @search-click="handleSearchClick"
      @refresh-click="handleRefreshClick"
    />
    <pageContent ref="pageContentRef" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import pageContent from './c-cpns/page-content.vue'
import pageSearch from './c-cpns/page-search.vue'
import type PageContent from './c-cpns/page-content.vue'
const pageContentRef = ref<InstanceType<typeof PageContent>>()
const handleSearchClick = function (searchForm) {
  pageContentRef.value?.fetchPageListData(searchForm)
}
const handleRefreshClick = function () {
  pageContentRef.value?.fetchPageListData()
}
</script>
<style lang="less" scoped>
.department {
}
</style>
