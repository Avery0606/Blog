<template>
  <div>
    <Top :msg="username" ref="Top"/>
    <div class="main-content">
      <div class="text">
        {{article.article}}
      </div>
      <div class="about">

      </div>
    </div>
  </div>
</template>

<script>
import Top from '../components/Top'
import { getCookie } from '@/assets/js/cookie.js'
export default {
    name:'article',
    components:{
      Top,
    },
    data(){
        return{
            username:'',
            id:'',
            article:{},
        }
    },
    mounted(){
      
    },
    created(){
        this.id = this.$route.params.id;
        let username = getCookie('username');
        this.username = username;
        this.getThisArticle(this.id);
    },
    methods:{
      getThisArticle:function(id){
        this.$axios({
          method:'get',
          url:'/api/getData/getThisArticle',
          params:{
            id:this.id,
          }
        }).then(res=>{
          this.article = res.data[0];
        })
      }
    },
}
</script>

<style >
  .main-content{
    width: 70%;
    padding-left:15%;
    padding-right:15%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .main-content .text{
    display: flex;
    background-color: white;
    width:70%;
  }
  .main-content .about{
    display: flex;
    background-color: white;
    width:25%;
    height:200px
  }
</style>