'use strict';

const Controller = require('egg').Controller;

class controllerUpdate extends Controller{
    async updateLikenum(){//点击注册后调用的方法
        let result = await this.service.serviceUpdate.serviceupdateLikenum();//执行service的insert方法
        this.ctx.body = result;
    }
}

module.exports = controllerUpdate;