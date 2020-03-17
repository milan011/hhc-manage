/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const nicheRouter = {
  path: '/niche',
  component: Layout,
  redirect: 'niche/index',
  name: 'Niche',
  meta: {
    title: 'niche',
    icon: 'component'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'Niche',
      meta: { title: 'niche' }
    },
  ]
}

export default nicheRouter
