<template>
  <div class="department">
    <pageSearch
      :search-config="searchConfig"
      @search-click="handleSearchClick"
      @refresh-click="handleRefreshClick"
    />
    <pageContent
      :content-config="contentConfig"
      ref="pageContentRef"
      @handle-new-or-change-user-click="handleNewOrChangeClick"
    />
    <pageModal ref="pageModalRef" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
import pageSearch from '@/components/page-search/page-search.vue'
import type PageContent from '@/components/page-content/page-content.vue'
import searchConfig from './config/search.config'
import pageModal from '@/components/page-modal/page-modal.vue'
import type PageModal from '@/components/page-modal/page-modal.vue'
const pageContentRef = ref<InstanceType<typeof PageContent>>()
const handleSearchClick = function (searchForm) {
  pageContentRef.value?.fetchPageListData(searchForm)
}
const handleRefreshClick = function () {
  pageContentRef.value?.fetchPageListData()
}
const pageModalRef = ref<InstanceType<typeof PageModal>>()
const handleNewOrChangeClick = function (isNew, formData) {
  if (isNew) {
    pageModalRef.value?.openCenterDialog(isNew)
  } else {
    pageModalRef.value?.openCenterDialog(isNew, formData)
  }
}
</script>
<style lang="less" scoped>
.department {
}
</style>
