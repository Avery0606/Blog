<template>
  <div id="Home">
    <Top :msg="username"  ref="Top"/>
    <div class="main-content">
      <div class="info">
        <div class="main-info">
          <div class="head">
            <img src="../assets/images/pony Ma.jpg">
          </div>
          <div class="General-info">
            <div style="height:70px"></div>
            <div id="username">{{username}}</div>
            <div class="Personal-profile">
              <i class="iconfont icon-gerenxinxi"></i>
              这家伙还没有个人简介
            </div>
          </div>
        </div>
        <div class="Following">
          <div style="color:#808080">Following</div>
          <div style="font-weight:bold">34</div>
        </div>
        <div class="Followers">
          <div style="color:#808080">Followers</div>
          <div style="font-weight:bold">155</div>
        </div>
        <div class="view-profile">
          <div style="cursor: pointer;">View Profile</div>
        </div>
      </div>
      <div class="articles">
        <div v-bind:key="item" v-for="item of article_data" class="article" @click="goToArticle(item.id)">
          <div id="item_title">{{item.title}}</div>
          <div id="item_info">
            <div id="item_username">{{item.username}}</div>
            <div id="item_differ">·{{item.differ}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Top from '../components/Top'
import { getCookie } from '@/assets/js/cookie.js'
import '../assets/css/Personal profile icon/iconfont.css'

export default {
  name: 'Home',
  components:{
    Top,
  },
  data(){
    return{
      username: '',
      article_data:[],
    }
    
  },
  mounted(){//执行初始化需要操作DOM的方法
      
  },
  created(){//此时加载数据，dom未进行渲染
    /*页面挂载获取保存的cookie值，渲染到页面上*/
    let username = getCookie('username');
    this.username = username;
    this.getAllArticles();//取得文章数据
  },
  methods:{
    getAllArticles:function(){
      this.$axios({
        method:'get',
        url:'/api/getData/getAllArticle'
      }).then(res=>{
        this.article_data = res.data;
        let current = this.getCurrentTime();
        for(let i = 0;i<this.article_data.length;i++){
          this.article_data[i].date = this.handleDate(this.article_data[i].date)
          let differ = current.day - this.article_data[i].date.day;
          if(differ == 0){
            this.article_data[i].differ = "今天"
          }else{
            this.article_data[i].differ = differ + "天前"
          }
          differ = current.month - this.article_data[i].date.month;
          if(differ>0){
            this.article_data[i].differ = differ + "月前"
          }
          differ = current.year - this.article_data[i].date.year;
          if(differ>0){
            this.article_data[i].differ = differ+"年前";
          }
        }
      })
    },
    handleDate:function(date){//处理后台的时间数据 返回年月日
      let reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/g;
      let result = reg.exec(date);
      let year = result.groups.year;
      let month = result.groups.month;
      let day = result.groups.day;
      return{
        year:year,
        month:month,
        day:day,
      }
    },
    getCurrentTime:function(){//获取当前系统时间
      let date = new Date();
      let year = date.getFullYear();        //年 ,从 Date 对象以四位数字返回年份
			let month = date.getMonth() + 1;      //月 ,从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
			let day = date.getDate();             //日 ,从 Date 对象返回一个月中的某一天 (1 ~ 31)
			if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
			//修改日期格式
			if (day >= 0 && day <= 9) {
		        day = "0" + day;
        }
      let temp = {
        year:year,
        month:month,
        day:day,
      }
      return temp;
    },
    goToArticle:function(id){
      this.$router.push(`/post/${id}`);
    }
  }
}
</script>

<style scoped>
  html,body,#Home{
    height:100%
  }
  .main-content{
    width:70%;
    padding-left:15%;
    padding-right:15%;
    /* height:1000px;
    background-color: white; */
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
  }
  .info{
    height:400px;
    width:30%;
    background-color: white;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-around;
  }
  .info .main-info{
    height:50%;
    border-bottom: 1px rgb(244,245,245) solid;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }
  .info .main-info .head{
    height:35%;
    background-color: rgb(64, 158, 255);
    position: relative;
  }
  .info .main-info .head img{
    position: absolute;
    height:100px;
    width:100px;
    border-radius: 50%;
    border: 2px white solid;
    left:29%;
    top:15%;
  }
  .info .main-info .General-info{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
  .info .main-info .General-info #username{
    font-family: -apple-system,system-ui,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial;
    font-weight: 600;
    cursor: default;
  }
  .info .main-info .General-info .Personal-profile{
    color: rgb(178, 186, 194);
    font-size: 14px;
    cursor: default;
  }
  .info .Following{
    height:20%;
    border-bottom: 1px rgb(244,245,245) solid;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    cursor: default;
  }
  .info .Followers{
    height:20%;
    border-bottom: 1px rgb(244,245,245) solid;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    cursor: default;
  }
  .info .view-profile{
    height:10%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: rgb(64, 158, 255);
  } 
  .info .view-profile div:hover{
    color:rgb(102, 177, 255)
  }
  .articles{
    width:65%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }
  .articles .article{
    cursor: pointer;
    background-color: white;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 85.3px;
    margin-bottom: 10px;
    justify-content: space-around;
    padding: 30px;
  }
  .articles .article:hover{
    background-color: rgb(252, 252, 252);
  }
  .articles .article #item_title{
    font-family: PingFang SC,Hiragino Sans GB,Arial,Microsoft YaHei,Verdana,Roboto,Noto,Helvetica Neue,sans-serif !important;
    font-size:18px;
    font-weight: bold;
  }
  .articles .article #item_info{
    font-family:Arial, Helvetica, sans-serif;
    font-size: 14px;
    color: rgb(178, 186, 194);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .articles .article #item_info #item_username{
    margin-right:2px;
  } 
  .articles .article #item_info #item_username:hover{
    color: rgb(64, 158, 255);
  }
  .articles .article #item_info #item_differ{
    position: relative;
    bottom: 2px;
  }

  
</style>
