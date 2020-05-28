'use strict';

const Controller = require('egg').Controller;

class controllerRegister extends Controller{
    async controllerRegister(){
        await this.ctx.render('register');//渲染模板文件并赋值给ctx.body
    }
    async getInput(){//点击注册后调用的方法
        let result = await this.service.serviceRegister.insertDatabase();//执行service的insert方法
        this.ctx.body = result;
    }
}

module.exports = controllerRegister;