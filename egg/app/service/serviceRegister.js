'use strict';

const Service = require("egg").Service;

class serviceRegister extends Service{
    async insertDatabase(){
        const telephone = this.ctx.request.body.telephone;
        const username = this.ctx.request.body.username;
        const password = this.ctx.request.body.password;
        //通过用户名查询
        const judgeResult1 = await this.app.mysql.select('register',{
            where:{
                username:username,
            },
            columns:['username']
        })
        //通过电话查询
        const judgeResult2 = await this.app.mysql.select('register',{
            where:{
                telephone:telephone,
            },
            colums:['username']
        })
        if(judgeResult1.length==1)
        {
            return {
                code:-1,
                message:'用户名重复！'
            }
        }
        if(judgeResult2.length==1)
        {
            return{
                code:-2,
                message:'该电话号码已被注册！'
            }
        }

        let res = await this.app.mysql.insert('register',{telephone,username,password});
        return{
            code:1,
            message:'注册成功！',
            res
        }
    }
}

module.exports = serviceRegister;