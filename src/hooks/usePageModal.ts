import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

export default function usePageContent() {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const handleNewOrChangeClick = function (isNew, formData) {
    if (isNew) {
      pageModalRef.value?.openCenterDialog(isNew)
    } else {
      pageModalRef.value?.openCenterDialog(isNew, formData)
    }
  }
  return { pageModalRef, handleNewOrChangeClick }
}
