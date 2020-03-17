/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const agreementRouter = {
  path: '/agreement',
  component: Layout,
  redirect: 'agreement/index',
  name: 'Agreement',
  meta: {
    title: 'agreement',
    icon: 'education'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'Agreement',
      meta: { title: 'agreement' }
    },
  ]
}

export default agreementRouter
