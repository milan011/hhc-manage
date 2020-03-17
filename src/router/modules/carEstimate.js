/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const carEstimateRouter = {
  path: '/carEstimate',
  component: Layout,
  redirect: 'carEstimate/index',
  name: 'CarEstimate',
  meta: {
    title: 'carEstimate',
    icon: 'edit'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'CarEstimate',
      meta: { title: 'carEstimate' }
    },
  ]
}

export default carEstimateRouter
