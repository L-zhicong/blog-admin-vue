// 主页数据列表
export const HomePageTitle = [
  {
    label: 'ID',
    type: 'commonData',
    prop: 'id',
    width: '70'
  },
  {
    label: '名称',
    type: 'commonData',
    prop: 'name',
    width: '120'
  },
  {
    label: '摘要',
    type: 'commonData',
    prop: 'synopsis',
    width: '120'
  },
  {
    label: '技能',
    type: 'commonData',
    prop: 'skills_name',
    width: '120'
  },
  {
    label: '图片类型',
    type: 'commonData',
    prop: 'img_class_name',
    width: '95'
  },
  {
    label: '状态',
    type: 'tagData',
    prop: 'status',
    formatColor: { 1: '', 2: 'info' },
    formatText: { 1: '应用', 2: '不应用' },
    width: '95'
  },
  {
    label: '创建时间',
    type: 'commonData',
    prop: 'create_time',
    width: '160'
  },
  {
    label: '操作',
    type: 'operation',
    operation: [
      { btnText: '查看信息', btnType: 'primary', clickFun: 'seeArticle', condition: () => null },
      { btnText: '编辑', btnType: 'warning', clickFun: 'updateArticle', condition: () => null },
      { btnText: '删除', btnType: 'info', clickFun: 'delArticle', condition: () => null }
    ],
    width: '220'
  }
]
