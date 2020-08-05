<template>
    <div class="write">
        <Top :msg="username"  ref="Top"/>
        <el-card class="content">
            <Editor ref="Editor"></Editor>
            <div class="action">
                <el-button @click="publish" type="primary" round>发布</el-button>
                <el-button @click="back" round>返回</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
import { getCookie } from '@/assets/js/cookie.js'
import Editor from '../components/Editor'
import Top from '../components/Top'
export default {
    name: 'Write',
    components:{
        Editor,
        Top,
    },
    data() {
        return {
            username: '',
        }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {
        /*页面挂载获取保存的cookie值，渲染到页面上*/
      let username = getCookie('username')
      this.username = username
    },
    methods:{
        back:function(){
            this.$router.push('/home')
        },
        publish:function(){//发布文章
            let dom = this.$refs.Editor.$el.childNodes[2];//获取编辑器内容节点
            let article = dom.innerHTML;//文章内容
            let title = this.$refs.Editor.title;//文章标题
            let username = this.username;//用户名
            let date = this.getCurrentTime();//发布时间
            let data = {
                username:username,
                title:title,
                article:article,
                date:date,
            };
            let flag = title;
            if(flag){//当内容校验无误后进行
                axios({
                    method:'post',
                    url:'http://127.0.0.1:7001/publish',
                    data:data,
                }).then(res=>{
                    let code = res.data.code;
                    let msg = res.data.msg;
                    if(code === 1){
                        this.$message({
                            message:msg+'   3秒后跳转至主页...',
                            type:'success',
                            showClose:true,
                            onClose:()=>{
                                this.$router.push('/home')
                            }
                        })
                    }
                    
                })
            }else{//内容有误
                this.$message({
                    message:'请输入文章标题',
                    type:'warning',
                    showClose:true,
                })
            }
        },
        getCurrentTime:function(){//获取当前系统时间
            let date = new Date();
            let year = date.getFullYear();        //年 ,从 Date 对象以四位数字返回年份
			let month = date.getMonth() + 1;      //月 ,从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
			let day = date.getDate();             //日 ,从 Date 对象返回一个月中的某一天 (1 ~ 31)
			let hours = date.getHours();          //小时 ,返回 Date 对象的小时 (0 ~ 23)
			let minutes = date.getMinutes();      //分钟 ,返回 Date 对象的分钟 (0 ~ 59)
			let seconds = date.getSeconds();      //秒 ,返回 Date 对象的秒数 (0 ~ 59)   
			//获取当前系统时间  
			// let currentDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
			// alert(currentDate);
			//修改月份格式
			if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
			//修改日期格式
			if (day >= 0 && day <= 9) {
		        day = "0" + day;
		    }
			//修改小时格式
			if (hours >= 0 && hours <= 9) {
		        hours = "0" + hours;
		    }
			//修改分钟格式
			if (minutes >= 0 && minutes <= 9) {
		        minutes = "0" + minutes;
		    }
			//修改秒格式
			if (seconds >= 0 && seconds <= 9) {
		        seconds = "0" + seconds;
		    }
			//获取当前系统时间  格式(yyyy-mm-dd hh:mm:ss)
			let currentFormatDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
            return currentFormatDate;
        }
    }
}
</script>
<style>
    .content{
        width:70%;
        height: 450px;
        padding:5px 5px;
        margin-left: 15%;
        margin-right: 15%;
        
    }
    .action{
        margin-top:10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>