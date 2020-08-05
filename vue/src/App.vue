<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { getCookie } from '@/assets/js/cookie.js'
export default {
  components:{
  },
  data(){
    return{
      
    }
  },
  mounted(){
      
  },
}
</script>>

<style>
  body{
    background-color: #f4f5f5;
    margin:0;
  }
  ::-webkit-scrollbar{
    width: .6rem;
    height: .6rem;
  }
  ::-webkit-scrollbar-thumb{
    background-color: #ccc;
    outline:none;
    border-radius: 10px;
  }
</style>
