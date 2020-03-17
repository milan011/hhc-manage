/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const wantRouter = {
  path: '/want',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Want',
  meta: {
    title: 'want',
    icon: 'guide'
  },
  children: [
    {
      path: 'allWant',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'AllWant',
      meta: { title: 'allWant' }
    },
    {
      path: 'myWant',
      component: () => import('@/views/components-demo/markdown'),
      name: 'MyWant',
      meta: { title: 'myWant' }
    }
  ]
}

export default wantRouter
