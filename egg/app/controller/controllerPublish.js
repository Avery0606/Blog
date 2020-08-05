'use strict';

const Controller = require('egg').Controller;

class controllerPublish extends Controller{
    async publish(){
        let result = await this.service.servicePublish.servicePublish();//service执行插入数据
        // console.log(result)
        this.ctx.body = result;
    }
    
}

module.exports = controllerPublish;