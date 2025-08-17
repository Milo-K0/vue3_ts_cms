import { ref } from 'vue'
import type PageContent from '@/components/page-content/page-content.vue'

export default function usePageContent() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleSearchClick = function (searchForm) {
    console.log(searchForm)
    pageContentRef.value?.fetchPageListData(searchForm)
  }
  const handleRefreshClick = function () {
    pageContentRef.value?.fetchPageListData()
  }
  return {
    pageContentRef,
    handleSearchClick,
    handleRefreshClick
  }
}
