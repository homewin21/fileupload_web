import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ViewUI from 'view-design';
// import style
import 'view-design/dist/styles/iview.css';
import app from '@/pages/layoutPage'
import mybtn from '@/pages/ButtonPage'
import split from '@/pages/splitPage'
import login from '@/pages/loginPage'
import cover from '@/components/coverr'
Vue.use(ViewUI) //使用iview组件
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/cover',
      name: 'cover',
      component: cover
    },{
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/app',
      name: 'app',
      component: app
    },
    {
      path: '/button',
      name:'mybtn',
      component:mybtn
    },{
      path: '/',
      name:'show',
      component:split
    }
  ]
})
