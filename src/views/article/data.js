// 文章分类
export const categoryTitle = [
  {
    label: '分类ID',
    type: 'commonData',
    prop: 'article_category_id',
    width: '95'
  },
  {
    label: '文章分类标题',
    type: 'commonData',
    prop: 'title',
    width: '120'
  },
  {
    label: '文章分类简介',
    type: 'commonData',
    prop: 'info',
    width: '160'
  },
  {
    label: '分类图片',
    type: 'coverData',
    prop: 'image',
    width: '140'
  },
  {
    label: '状态',
    type: 'tagData',
    formatColor: { 0: 'danger', 1: 'primary' },
    formatText: { 0: '禁用', 1: '正常' },
    prop: 'status',
    width: '95'
  },
  {
    label: '创建时间',
    type: 'timeData',
    prop: 'create_time',
    width: '180'
  },
  {
    label: '操作',
    type: 'operation',
    operation: [
      { btnText: '启用', btnType: 'success', clickFun: 'changeStatus', condition: row => row.status === 0 },
      { btnText: '禁用', btnType: 'danger', clickFun: 'changeStatus', condition: row => row.status === 1 },
      { btnText: '编辑', btnType: 'warning', clickFun: 'editCategory', condition: () => null },
      { btnText: '删除', btnType: 'info', clickFun: 'delStatus', condition: () => null }
    ],
    width: '200'
  }
]
