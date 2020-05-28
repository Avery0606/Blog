<template>
  <div>
    <h3>当前用户： {{username}}</h3>
    <el-button  @click="quit" >退出登录</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import { getCookie,delCookie } from '@/assets/js/cookie.js'
export default {
  name: 'Home',
  data(){
    return{
      username: ''
    }
  },
  mounted(){
      /*页面挂载获取保存的cookie值，渲染到页面上*/
      let username = getCookie('username')
      this.username = username
      /*如果cookie不存在，则跳转到登录页*/
      if(username == ""){
          this.$router.push('/')
      }
  },
  methods:{
      quit(){
          /*删除cookie*/
          delCookie('username')
          this.$router.push('/login')
      }
  }
}
</script>
