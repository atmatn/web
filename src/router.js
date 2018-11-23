import Vue from 'vue'
import Router from 'vue-router'
import RunScript from './views/RunScript.vue'
import DataTree from './views/DataTree.vue'
import DataTreeHome from './views/DataTreeHome.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/ui/',
  routes: [
    {
      path: '/data-tree',
      name: 'data-tree',
      component: DataTree,
      children: [{
        path: 'run-script',
        name: 'run-script',
        component: RunScript
      }, {
        path: 'home',
        name: 'data-tree-home',
        component: DataTreeHome
      }]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '*',
      redirect: { name: 'data-tree-home' }
    }
  ]
})
