<template>
    <div class="mainbox">
    <h2>Registry</h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="telephone" >
            <el-input v-model="ruleForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" >
            <el-input  type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input  type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" >立即注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="returnToLogin()">返回</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
  export default {
    data() {
        var validatePass = (rule, value, callback) => {//自定义校验规则
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(value.length<6||value.length>16){
            callback(new Error('请输入6-16位密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
        };
        var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
        };
      return {
        ruleForm: {
          username: '',
          telephone:'',
          pass:'',
          checkPass:'',
        },
        rules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            telephone:[
                {required: true, message: '请输入手机号码', trigger: 'blur'},
                {min: 11, max: 11, message: '长度为11个数字', trigger: 'blur'},
            ],
            pass:[
                {required: true, validator: validatePass, trigger: 'blur'},
            ],
            checkPass:[
                {required: true, validator: validatePass2, trigger: 'blur'},
            ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            this.$axios({
                method:'post',
                url:'/api/commit',
                data:{
                    username:this.ruleForm.username,
                    password:this.ruleForm.pass,
                    telephone:this.ruleForm.telephone
                }
            }).then(res=>{
              console.log(res.data)
              if(res.data.code == 1)
              {
                this.$router.push('/login');
                alert(res.data.message)
              }
              else if(res.data.code == -1){
                  this.ruleForm.username = ''
                  alert(res.data.message)
              }
              else if(res.data.code == -2){
                this.ruleForm.telephone = ''
                alert(res.data.message)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      returnToLogin(){
        this.$router.push('/login')
      }
    }
  }
</script>

<style>
.mainbox{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>