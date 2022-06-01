import Layout from '@/layout'
const articleRouter = {
  path: '/article',
  component: Layout,
  redirect: '/article',
  name: 'article',
  meta: { title: '文章管理' },
  children: [
    {
      path: '/article/category',
      name: 'articleCategory',
      component: () => import('@/views/article/category/index.vue'),
      meta: { title: '文章分类列表' }
    }
  ]
}
export default articleRouter
