/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const enterpriseRouter = {
  path: '/enterprise',
  component: Layout,
  redirect: 'enterprise/index',
  name: 'Enterprise',
  meta: {
    title: 'enterprise',
    icon: 'international'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'Enterprise',
      meta: { title: 'enterprise' }
    },
  ]
}

export default enterpriseRouter
