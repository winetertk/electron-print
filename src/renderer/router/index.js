import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    // {
    //   path: '*',
    //   redirect: '/'
    // },
    {
      name: 'print',
      path: '/print',
      components: require('@/components/printHtml')
    }
  ]
})
