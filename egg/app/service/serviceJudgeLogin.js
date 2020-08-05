'use strict';

const Service = require("egg").Service;
const utility = require("utility");//密码加密
class serviceJudgeLogin extends Service{
    async serviceJudgeLogin(){
        var account = this.ctx.request.body.username
        var password = this.ctx.request.body.password
        password = utility.md5(password);
        //通过用户名查询
        const judgeResult1 = await this.app.mysql.select('register',{
            where:{
                username:account,
                password:password
            },
            columns:['username']
        })
        //通过电话查询
        const judgeResult2 = await this.app.mysql.select('register',{
            where:{
                telephone:account,
                password:password
            },
            colums:['username']
        })

        if((judgeResult1.length==1)||(judgeResult2.length==1))
        {
            return{
                code:1,
                message:'登陆成功',
                // token
            }
        }
        else
        {
            return{
                code:-1,
                message:'账号或密码有误'
            }
        }
    }
}

module.exports = serviceJudgeLogin;