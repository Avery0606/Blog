import Vue from 'vue'
import VueRouter from 'vue-router'
import { getCookie } from '@/assets/js/cookie.js'
const Login = () =>
    import ("@/views/login")
const Registry = () =>
    import ("@/views/registry")
const Home = () =>
    import ("@/views/Home")
const Write = () =>
    import ("@/views/write")
const Article = () =>
    import ("@/views/article")


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/registry',
    name:'registry',
    component:Registry
  },
  {
    path:'/home',
    name:'home',
    component:Home,
    meta:{
      isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
    }//路由元
  },
  {
    path:'/write',
    name:'write',
    component:Write,
    meta:{
      isLogin:true
    }
  },
  {
    path:'/post/:id',
    name:'article',
    component:Article,
    meta:{
      isLogin:true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  let username = getCookie('username');
  if(to.matched.some(res=>res.meta.isLogin)){//判断是否需要登录
    if(username){
      next();
    }else{
      next({
        path:"/login",
        query:{
          redirect:to.fullPath
        }
      })
    }
  }else{
    next()
  }
})

export default router
