import type { ModalConfig } from './type'

const modalConfig: ModalConfig = {
  pageName: 'role',
  header: {
    newTitle: '新建角色',
    changeTitle: '编辑角色'
  },
  formData: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称'
    },
    {
      type: 'input',
      label: '权限介绍',
      prop: 'intro',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'custom',
      slotName: 'menuList'
    }
  ]
}

export default modalConfig
