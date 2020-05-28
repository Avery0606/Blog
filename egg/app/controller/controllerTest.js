'use strict';

const Controller = require('egg').Controller;

class controllerTest extends Controller{
    async Test(){
        let result = this.ctx.request.body
        console.log(result)
    }
}

module.exports = controllerTest;