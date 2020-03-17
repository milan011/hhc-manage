/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const noticeRouter = {
  path: '/notice',
  component: Layout,
  redirect: 'notice/index',
  name: 'Notice',
  meta: {
    title: 'notice',
    icon: 'message'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'Notice',
      meta: { title: 'notice' }
    },
  ]
}

export default noticeRouter
