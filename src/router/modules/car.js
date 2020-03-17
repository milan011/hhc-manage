/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const carRouter = {
  path: '/car',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Car',
  meta: {
    title: 'car',
    icon: 'example'
  },
  children: [
    {
      path: 'allCar',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'AllCar',
      meta: { title: 'allCar' }
    },
    {
      path: 'myCar',
      component: () => import('@/views/components-demo/markdown'),
      name: 'MyCar',
      meta: { title: 'myCar' }
    }
  ]
}

export default carRouter
