// 文章列表
export const articleTitle = [
  {
    label: '文章ID',
    type: 'commonData',
    prop: 'id',
    width: '70'
  },
  {
    label: '文章名称',
    type: 'commonData',
    prop: 'name',
    width: '120'
  },
  {
    label: '文章LOGO',
    type: 'coverData',
    prop: 'logo',
    width: '130'
  },
  {
    label: '文章标题',
    type: 'commonData',
    prop: 'title',
    width: '110'
  },
  {
    label: '摘要',
    type: 'commonData',
    prop: 'abstract',
    width: '120'
  },
  {
    label: '关联词',
    type: 'commonData',
    prop: 'related_words',
    width: '120'
  },
  {
    label: '来源',
    type: 'commonData',
    prop: 'source',
    width: '95'
  },
  {
    label: '作者',
    type: 'commonData',
    prop: 'author',
    width: '95'
  },
  {
    label: '阅读人数',
    type: 'numData',
    prop: 'read_num',
    width: '70'
  },
  {
    label: '点赞人数',
    type: 'numData',
    prop: 'FabulousNum',
    width: '70'
  },
  {
    label: '状态',
    type: 'tagData',
    prop: 'status',
    formatColor: { 1: '', 2: 'info' },
    formatText: { 1: '发布', 2: '未发布' },
    width: '95'
  },
  {
    label: '创建时间',
    type: 'commonData',
    prop: 'create_time',
    width: '160'
  },
  {
    label: '发布时间',
    type: 'timeData',
    prop: 'release_time',
    width: '190'
  },
  {
    label: '操作',
    type: 'operation',
    operation: [
      { btnText: '查看文章', btnType: 'primary', clickFun: 'seeArticle', condition: () => null },
      { btnText: '编辑', btnType: 'warning', clickFun: 'updateArticle', condition: () => null },
      { btnText: '删除', btnType: 'info', clickFun: 'delArticle', condition: () => null }
    ],
    width: '220'
  }
]
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
