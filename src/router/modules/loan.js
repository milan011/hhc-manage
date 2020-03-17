/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const loanRouter = {
  path: '/loan',
  component: Layout,
  redirect: 'loan/index',
  name: 'Loan',
  meta: {
    title: 'loan',
    icon: 'money'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'Loan',
      meta: { title: 'loan' }
    },
  ]
}

export default loanRouter
