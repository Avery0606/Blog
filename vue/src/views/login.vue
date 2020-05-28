<template>
    <div class='mainbox'>
        <h2>Login</h2>
        <!-- <el-input class="elinput" placeholder="请输入用户名" v-model="ruleForm.user" ></el-input>
        <el-input class="elinput" placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
        <router-link to='/registry' style="margin-bottom:0.5%;">无账号? 注册!</router-link>
        <el-button class="login_button" @click="login()" size='medium' round>登录</el-button> -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
            <el-form-item label="" prop="username">
                <el-input v-model="ruleForm.username" placeholder="请输入用户名或手机号码"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password" >
                <el-input  type="password" v-model="ruleForm.password" placeholder="请输入密码" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="login_bt" type="primary" @click="login('ruleForm')" >登录</el-button>
                <el-button  @click="goRegistry()" >前往注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
import {setCookie,getCookie} from '@/assets/js/cookie.js'
export default {
    data(){
        return{
            ruleForm:{
                username:'',
                password:''
            },
            rules: {
            username: [
                { required: true, message: '请输入用户名或手机号码', trigger: 'blur' },
            ],
            password:[
                {required: true, message: '请输入密码', trigger: 'blur'},
            ],
        }
        }
    },
    mounted(){
        /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
        if(getCookie('username')){
            this.$router.push('/home')
        }
    },
    methods:{
        login(formName){
            console.log(this.ruleForm)
            this.$refs[formName].validate((valid) => {
            if (valid) {
                axios({
                    method:'post',
                    url:'http://127.0.0.1:7001/login',
                    data:{
                        username:this.ruleForm.username,
                        password:this.ruleForm.password
                    }
                })
                .then(res=>{
                    console.log(res)
                    if(res.data.code == 1)
                    {
                        //登陆成功
                        setCookie('username',this.ruleForm.username,1000*60)
                        setTimeout(function(){
                            this.$router.push('/home')
                        }.bind(this),1000)
                        alert(res.data.message);
                    }
                    else 
                    {
                        //登陆失败
                        this.ruleForm.password = '';
                        alert(res.data.message);
                    }
                })
            }else {
                console.log('error submit!!');
                return false;
          }
        })
        },
        goRegistry(){
            this.$router.push('/registry')
        }
    }
}
</script>>

<style >
.mainbox{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.el-form-item{
  text-align: center;
}

</style>