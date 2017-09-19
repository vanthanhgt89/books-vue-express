import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Layout',
      component: Layout,
      props: (route) => ({ page: route.query.page || 1})
    },
    {
      path: '/:id',
      name: 'Category',
      component: Layout,
      props: true,
      // props: (route) => ({ pageCategory: route.query.page })
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail,
      props: true,
    },
  ],
  scrollBehavior: (to, from, savedPosition) => {
    return {
      y: 0
    }
  }
})
