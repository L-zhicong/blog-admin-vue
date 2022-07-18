import Layout from '@/layout'
const articleRouter = {
  path: '/article',
  component: Layout,
  redirect: '/article',
  name: 'article',
  meta: { title: '文章管理' },
  children: [
    {
      path: '/article/list',
      name: 'articleList',
      component: () => import('@/views/article/index'),
      meta: { title: '文章列表' }
    },
    {
      path: '/article/list/edit/:id(\\d+)',
      name: 'rticleEdit',
      component: () => import('@/views/article/details/index'),
      meta: { title: '编辑文章', activeMenu: '/article/list' },
      hidden: true
    },
    {
      path: '/article/list/add',
      name: 'rticleAdd',
      component: () => import('@/views/article/details/index'),
      meta: { title: '添加文章', activeMenu: '/article/list' },
      hidden: true
    },
    {
      path: '/article/category',
      name: 'articleCategory',
      component: () => import('@/views/article/category/index.vue'),
      meta: { title: '文章分类列表' }
    }
  ]
}
export default articleRouter
