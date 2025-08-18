import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

export default function usePageContent(
  newCallBack?: any,
  changeCallBack?: any
) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const handleNewOrChangeClick = function (isNew, formData) {
    if (isNew) {
      pageModalRef.value?.openCenterDialog(isNew)
      if (newCallBack) newCallBack()
    } else {
      pageModalRef.value?.openCenterDialog(isNew, formData)
      if (changeCallBack) changeCallBack(formData)
    }
  }
  return { pageModalRef, handleNewOrChangeClick }
}
