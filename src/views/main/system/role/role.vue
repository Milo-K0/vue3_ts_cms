<template>
  <div class="role">
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
    <pageModal
      :modal-config="modalConfig"
      ref="pageModalRef"
      :other-info="otherInfo"
    >
      <template #menuList>
        <el-tree
          ref="elTreeRef"
          :data="data"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckClick"
        />
      </template>
    </pageModal>
  </div>
</template>
<script lang="ts" setup>
import searchConfig from './config/search.config'
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import { useMainStore } from '@/store/main/main'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import type { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/map-manus'

const mainStore = useMainStore()
mainStore.getEntreMenusActions()
const { entreMenus } = storeToRefs(mainStore)
const data = entreMenus

const otherInfo = ref({})

function handleCheckClick(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

const elTreeRef = ref<InstanceType<typeof ElTree>>()

const changeCallBack = function (formData) {
  const menuIds = mapMenuListToIds(formData.menuList)
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(menuIds)
  })
}

const newCallBack = function () {
  elTreeRef.value?.setCheckedKeys([])
}

const { pageContentRef, handleSearchClick, handleRefreshClick } =
  usePageContent()

const { pageModalRef, handleNewOrChangeClick } = usePageModal(
  newCallBack,
  changeCallBack
)
</script>
<style lang="less" scoped>
.role {
}
</style>
