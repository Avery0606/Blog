<template>
  <div>
  <div id="Top">
      <div @click="refresh" :title="'Hi!'+msg">
        <div class="info"><span>{{msg}}</span></div>
      </div>
    <div class="top-right">
        <div class="write" @click="write">
            <el-button type="primary" icon="el-icon-edit" >写文章</el-button>
        </div>
        <el-button  @click="quit" >退出登录</el-button>
    </div>
  </div>
  <div style="height:80px"></div> 
  </div>
</template>

<script>
import { delCookie } from '@/assets/js/cookie.js'
import { getCookie } from '@/assets/js/cookie.js'
export default {
  name: 'Top',
  props: ['msg'],
  data(){
      return {
      }
  },
  methods:{
      refresh:function(){
          this.$router.push('/home')
      },
      write:function(){
          this.$router.push('/write')
      },
      quit:function(){
          /*删除cookie*/
          delCookie('username')
          console.log(getCookie('username'))
          this.$router.push('/login')
      }
  }
}
</script>
<style scoped> 
/*scoped表示css样式仅在当前页面生效*/
  #Top{
    width:70%;
    background-color: white;
    height: 40px;
    display: flex;
    position: fixed;
    top:0;
    z-index: 100;
    padding-left: 15%;
    padding-right: 15%;
    flex-wrap: nowrap;
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: 0 0 10px #888888;
    flex-direction: row;
    justify-content: space-between;
  }
  .info{
      height: 100%;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border: 1px rgb(220, 223, 230) solid;
      border-radius: 4px;
      padding-left: 15px;
      padding-right: 15px;

  }
  .info:hover{
      box-shadow: 0 0 5px #888888;
      transition: all 0.2s;
  }
  .info span{
      font-size: 14px;
      font-family: Arial, Helvetica, sans-serif;
  }
  .top-right{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
  }
  .write{
      margin-right: 10px;
  }
</style>