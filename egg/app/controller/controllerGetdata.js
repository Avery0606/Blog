'use strict';

const Controller = require('egg').Controller;

class controllerGetdata extends Controller{
    async getUsername(){
        let result = await this.service.serviceGetdata.servicegetUsername();
        this.ctx.body = result;
    }
    async getAllArticle(){
        let result = await this.service.serviceGetdata.servicegetAllArticle();
        this.ctx.body = result;
    }
    async getThisArticle(){
        let result = await this.service.serviceGetdata.servicegetThisArticle();
        this.ctx.body = result;
    }
    async getThisLikenum(){
        let result = await this.service.serviceGetdata.servicegetThisLikenum();
        this.ctx.body = result;
    }

    async getThisLikeState(){
        let result = await this.service.serviceGetdata.servicegetThisLikeState();
        this.ctx.body = result;
    }
    
}

module.exports = controllerGetdata;