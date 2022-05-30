import Layout from '@/layout'

const settingRouter = {
  path: '/settings',
  name: 'Settings',
  component: Layout,
  meta: { title: '设置' },
  children: [
    {
      path: 'setting',
      name: 'Setting',
      component: () => import('@/views/setting'),
      meta: { title: '权限管理' },
      children: [
        {
          path: '/setting/menu',
          name: 'menuManage',
          meta: { title: '菜单管理' },
          component: () => import('@/views/setting/menusManage')
        },
        {
          path: '/setting/systemAdmin',
          name: 'systemAdmin',
          meta: { title: '管理员管理' },
          component: () => import('@/views/setting/adminManage')
        },
        {
          path: '/setting/systemRole',
          name: 'systemRole',
          meta: { title: '身份管理' },
          component: () => import('@/views/setting/roleManage')
        }
      ]
    }
  ]
}
export default settingRouter
