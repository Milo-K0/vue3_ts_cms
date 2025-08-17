export interface ModalConfig {
  pageName: string
  header: {
    newTitle: string // 新增标题
    changeTitle: string // 修改标题
  }
  formData: FormItem[] // 表单项数组
}

interface FormItem {
  type: string
  label: string
  prop: string
  placeholder: string
  options?: any[]
}
