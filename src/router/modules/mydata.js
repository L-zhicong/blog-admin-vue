import Layout from '@/layout'
const mydataRouter = {
  path: '/mydataManage',
  component: Layout,
  redirect: '/mydataManage',
  name: 'mydataManage',
  meta: { title: '个人资料管理' },
  children: [
    {
      path: '/mydataManage/myhomepage',
      name: 'myhomepage',
      component: () => import('@/views/mydataManage/myhomepage/index'),
      meta: { title: '主页管理' }
    },
    {
      path: '/mydataManage/myblog',
      name: 'myblog',
      //   component: () => import('@/views/article/details/index'),
      meta: { title: '博客管理', activeMenu: '/article/list' },
      hidden: true
    },
    {
      path: '/mydataManage/addhomedata',
      name: 'addhomedata',
      component: () => import('@/views/mydataManage/myhomepage/components/addEditHomePage'),
      meta: { title: '添加主页信息', activeMenu: '/mydataManage/addhomedata' },
      hidden: true
    },
    {
      path: '/homedata/list/edit/:id(\\d+)',
      name: 'edithomedata',
      component: () => import('@/views/mydataManage/myhomepage/components/addEditHomePage'),
      meta: { title: '编辑主页信息', activeMenu: '/article/list' },
      hidden: true
    },
    {
      path: '/homedata/index',
      name: 'edithomedata',
      component: () => import('@/views/myhomepage/index'),
      meta: { title: '个人主页', activeMenu: '/article/list' },
      hidden: true
    }
  ]
}
export default mydataRouter
