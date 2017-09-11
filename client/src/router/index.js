import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Category from '@/components/Book-category'
import Book_Detail from '@/components/Book-detail'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Layout',
      component: Layout
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: Category
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Book_Detail
    },
  ],
  scrollBehavior: (to, from, savedPosition) => {
      return {x: 0, y: 0}
  }
})
