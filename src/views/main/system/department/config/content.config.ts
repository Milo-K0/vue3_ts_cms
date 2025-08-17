const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建数据'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '40px' },
    { type: 'index', label: '序号', width: '40px' },
    {
      type: 'normal',
      label: '部门名称',
      prop: 'name',
      width: '110px'
    },
    {
      type: 'custom',
      label: '部门领导',
      prop: 'leader',
      width: '110px',
      slotName: 'leader'
    },
    {
      type: 'custom',
      label: '上级部门',
      prop: 'parentId',
      width: '110px',
      slotName: 'parent'
    },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '170px' }
  ]
}

export default contentConfig
