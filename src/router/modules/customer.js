/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const customerRouter = {
  path: '/customer',
  component: Layout,
  redirect: 'customer/index',
  name: 'Customer',
  meta: {
    title: 'customer',
    icon: 'people'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'Customer',
      meta: { title: 'customer' }
    },
  ]
}

export default customerRouter
