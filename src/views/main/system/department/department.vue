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
    >
      <template #leader="scope">
        <span class="leaderSlot">{{ scope.row[scope.prop] }}</span>
      </template>
      <template #parent="scope">
        <span class="parentSlot">{{ scope.row[scope.prop] }}</span>
      </template>
    </pageContent>
    <pageModal :modal-config="modalConfigRef" ref="pageModalRef" />
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'
import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'
import { useMainStore } from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

interface DepartmentItem {
  label: string // 部门名称
  value: number // 部门ID（根据实际类型调整，可能是string）
}

const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments: DepartmentItem[] = mainStore.entreDepartments.map(
    (item) => {
      return { label: item.name, value: item.id }
    }
  )
  modalConfig.formData.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  return modalConfig
})

const { pageContentRef, handleSearchClick, handleRefreshClick } =
  usePageContent()

const { pageModalRef, handleNewOrChangeClick } = usePageModal()
</script>
<style lang="less" scoped>
.department {
  .leaderSlot {
    color: red;
  }
  .parentSlot {
    color: blue;
  }
}
</style>
