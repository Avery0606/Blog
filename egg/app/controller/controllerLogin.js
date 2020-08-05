'use strict';

const Controller = require('egg').Controller;

class controllerLogin extends Controller{
    async Loginpage(){
        await this.ctx.render('login');
    }
    async judgeLogin(){
        let result = await this.service.serviceJudgeLogin.serviceJudgeLogin();//service执行判断
        this.ctx.body = result;
    }
    
}

module.exports = controllerLogin;