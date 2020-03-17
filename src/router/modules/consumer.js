/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const consumerRouter = {
  path: '/consumer',
  component: Layout,
  redirect: 'consumer/index',
  name: 'Consumer',
  meta: {
    title: 'consumer',
    icon: 'user'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'Consumer',
      meta: { title: 'consumer' }
    },
  ]
}

export default consumerRouter
