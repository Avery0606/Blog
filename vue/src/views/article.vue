<template>
  <div>
    <Top :msg="username" ref="Top"/>
    <div class="main-content">
      <div class="main-box">
        <div class="tools">
          <div class="tool_item" @click="addlike()" title="点赞">
            <i class="iconfont icon-tools-dianzan" ></i>
            <div class="tool_likenum">{{likenum}}</div>
          </div>
          <div class="tool_item"><i class="iconfont icon-tools-pinglun" style="font-size:18px"></i></div>
        </div>
        <div class="textInfo">
          <div class="author">{{article.username}}</div>
          <div class="date">{{handleddate}}</div>
        </div>
        <h1 class="title">{{article.title}}</h1>
        <div class="text"></div>
      </div>
      <div class="about">
        <div class="about-text">关于作者</div>
        <div class="about-author">
          <div class="about-author-name">{{article.username}}</div>
          <div class="likesnum">
            <i class="iconfont icon-dianzan" style="color:rgb(64,158,255)"></i>
            <div>获得点赞数  1877</div>
          </div>
          <div class="readnum">
            <i class="iconfont icon-yuedu" style="color:rgb(64,158,255)"></i>
            <div>文章被阅读  2328948</div>
          </div>
        </div>
        <div class="followAuthor">关注ta</div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/art_tools icon/iconfont.css' 
import '../assets/css/like icon/iconfont.css' 
import '../assets/css/read icon/iconfont.css'
import Top from '../components/Top'
import { getCookie } from '@/assets/js/cookie.js'
export default {
    name:'articleView',
    components:{
      Top,
    },
    data(){
        return{
            username:'',
            id:'',
            article:{},
            handleddate:'',
            like_state:false,
            likenum:0,
        }
    },
    mounted(){

    },
    created(){
        this.id = this.$route.params.id;
        let username = getCookie('username');
        this.username = username;
        this.getThisArticle(this.id);
        this.getLikenum(this.id);
        this.setLike_state();
    },
    methods:{
      setLike_state:function(){
        this.$axios({
          method:'get',
          url:'/api/getData/getThisLikeState',
          params:{
            id:this.id,
            username:this.username,
          }
        }).then(res=>{
          this.like_state = res.data;
          this.setLikeDisplay(this.like_state);
        })
      },
      getThisArticle:function(id){
        this.$axios({
          method:'get',
          url:'/api/getData/getThisArticle',
          params:{
            id:this.id,
          }
        }).then(res=>{
          this.article = res.data[0];
          this.handleTime(this.article.date);
          let artdom = document.createElement('div')
          artdom.innerHTML = this.article.article
          let dom = document.getElementsByClassName('text')[0]
          dom.appendChild(artdom)
        })
      },
      getLikenum:function(id){
        this.$axios({
          method:'get',
          url:'/api/getData/getThisLikenum',
          params:{
            id:this.id,
          }
        }).then(res=>{
          this.likenum = res.data[0].num
        })
      },
      handleTime:function(date){
        //2020-08-01T15:29:05.000Z
        let r = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
        let matchobj = r.exec(date);
        this.handleddate = matchobj.groups.year + "年" + matchobj.groups.month + "月" + matchobj.groups.day + "日"
      },
      addlike:function(){
        this.like_state = !this.like_state;
        this.setLikeDisplay(this.like_state);
        if(this.like_state){
          this.likenum++;
        }else{
          this.likenum--;
        }
        this.$axios({
          method:'post',
          url:'/api/update/updateLikenum',
          data:{
            likenum:this.likenum,
            username:this.username,
            id:this.id,
            like_state:!this.like_state,
          }
        })
        
      },
      setLikeDisplay:function(state){
        let dom = document.getElementsByClassName("tool_item")[0].childNodes;
        if(state){
          dom[0].style.color = "rgb(108,189,69)";
          dom[1].style.backgroundColor = "rgb(108,189,69)";
        }else{
          dom[0].style.color = "";
          dom[1].style.backgroundColor = "";
        }
      },
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
  .main-content .main-box{
    display: flex;
    padding-top: 10px;
    padding-left:20px;
    padding-right:20px;
    padding-bottom: 10px;
    background-color: white;
    width:67%;
    flex-direction: column;

  }
  .tools{
    position: fixed;
    left:7%;
    top:45%;
  }
  .tools .tool_item{
    background-color: white;
    margin-bottom: 10px;
    border-radius: 50%;
    width:40px;
    height:40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .tools .tool_item i{
    font-size:20px;
    color:rgb(178,186,194);
  }
  .tools .tool_item i:hover{
    color:rgb(138,147,160);
  }
  .tool_likenum{
    position:absolute;
    top:1%;
    left: 70%;
    font-size:10px;
    transform: scale(.9);
    width:fit-content;
    height: fit-content;
    padding-left:3px;
    padding-right:3px;
    border-radius: .7rem;
    color:white;
    line-height: 1;
    background-color:rgb(178,186,194);
  }
  .main-box .textInfo{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom:2px solid rgb(244,245,245);
  }
  .textInfo .author{
    font-weight: bold;
    width: fit-content;
    font-family: -apple-system,system-ui,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial;
    font-size:18px;
    cursor: pointer;
  }
  .textInfo .date{
    letter-spacing: 1px;
    color: #909090;
    font-size:14px;
    font-family: Arial, Helvetica, sans-serif;
    margin-top:2px;
    margin-bottom:2px;
  }
  .main-box .title{
    margin-top:.67em;
    margin-bottom: .67em;
    font-size:2.2em;
    line-height: 1.5;
  }
  .main-content .about{
    display: flex;
    background-color: white;
    width:25%;
    height:200px;
    flex-direction: column;
    justify-content: space-around;
  }
  .about .about-text{
    border-bottom:1px solid rgb(244,245,245);
    padding:10px;
    font-size:14px;
    cursor: default;
    font-family: Arial, Helvetica, sans-serif;
  }
  .about .about-author{
    
  }
  .about-author-name{
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size:20px;
    padding-left:20px;
    padding-top:10px;
  }
  .likesnum{
    display: flex;
    flex: row;
    flex-wrap: nowrap;
    padding-left:20px;
    padding-top:10px;
  }
  .likesnum div{
    font-family: Arial, Helvetica, sans-serif;
    margin-left:3px;
  }
  .readnum{
    display: flex;
    flex: row;
    flex-wrap: nowrap;
    padding-left:20px;
    padding-top:10px;
  }
  .readnum div{
    font-family: Arial, Helvetica, sans-serif;
    margin-left:3px;
  }
  .followAuthor{
    text-align: center;
    cursor: pointer;
    font-weight: bold;
    color:rgb(64,185,255);
  }
  .followAuthor:hover{
    color:rgb(76, 159, 248);
  }
</style>