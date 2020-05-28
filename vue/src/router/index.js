import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () =>
    import ("@/views/login")
const Registry = () =>
    import ("@/views/registry")
const Home = () =>
    import ("@/views/Home")


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

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
