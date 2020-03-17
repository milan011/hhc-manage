/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const transactionRouter = {
  path: '/transaction',
  component: Layout,
  redirect: 'transaction/index',
  name: 'Transaction',
  meta: {
    title: 'transaction',
    icon: 'shopping'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'Transaction',
      meta: { title: 'transaction' }
    },
  ]
}

export default transactionRouter
