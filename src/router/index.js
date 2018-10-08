import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/views/login'
import welcome from '@/components/views/welcome'
import content from '@/components/views/content'
import classify from '@/components/goods/classify'
import goodslist from '@/components/goods/goodslist'
import userlist from '@/components/user/userlist'
import admin from '@/components/user/admin'
import edit from '@/components/user/edit'
import goodsedit from '@/components/goods/goodsedit'
import goodseditone from '@/components/goods/goodseditone'
import classifyedit from '@/components/goods/classifyedit'
import  adduser from '@/components/user/adduser'
import  alledit from '@/components/user/alledit'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/content',
      name: 'content',
      component:content,
      meta: { requiresAuth: true },
      children:[
        {
          path:'/content',
          component:welcome
        },
        {
          path: 'classify',
          component:classify,
          meta: { requiresAuth: true }
        },
        {
          path: 'goodslist',
          component:goodslist,
          meta: { requiresAuth: true }
        },
        {
          path: 'userlist',
          component:userlist,
          meta: { requiresAuth: true }
        },
        {
          path: 'admin',
          component:admin,
          meta: { requiresAuth: true }
        },
        {
          path: 'edit',
          component:edit,
          meta: { requiresAuth: true }
        },
        {
          path: 'goodsedit',
          component:goodsedit,
          meta: { requiresAuth: true }
        },
        {
          path: 'classifyedit',
          component:classifyedit,
          meta: { requiresAuth: true }
        },
        {
          path:'adduser',
          component: adduser,
          meta: { requiresAuth: true }
        },
        {
          path:'alledit',
          component: alledit,
          meta: { requiresAuth: true }
        },
        {
          path:'goodseditone',
          component: goodseditone,
          meta: { requiresAuth: true }
        }

      ]
    },
  ]
})
router.beforeEach((to, from, next) => {

  // 需要登录才允许进入路由
  if(to.meta.requiresAuth){
  	// 判断是否登录
  	if(sessionStorage.getItem('token')){
  		next();
  	}else{
  		next({
  			path:'/'
  		})
  	}
  }else{
	  // 调用next()方法，放行路由跳转
	  next();
  }

});
export default router
