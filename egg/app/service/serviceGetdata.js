'use strict';

const Service = require("egg").Service;
class serviceGetdata extends Service{
    async servicegetUsername(){
        let user = this.ctx.query.user;
        let result1 = await this.app.mysql.select('register',{
            where:{
                username:user
            },
            columns:['username']
        })
        
        let result2 = await this.app.mysql.select('register',{
            where:{
                telephone:user
            },
            columns:['username']
        })
        let result = result1.length? result1[0].username : result2[0].username;
        return result;
    }
    async servicegetAllArticle(){
        let result = await this.app.mysql.select('article');
        return result;
    }
    async servicegetThisArticle(){
        let id = this.ctx.query.id;
        let result = await this.app.mysql.select('article',{
            where:{
                id:id
            }
        });
        return result;
    }
    async servicegetThisLikenum(){
        let id = this.ctx.query.id;
        let result = await this.app.mysql.select('article_likenum',{
            where:{
                id:id
            }
        });
        return result;
    }

    async servicegetThisLikeState(){
        let id = this.ctx.query.id;
        let username = this.ctx.query.username;
        let result = await this.app.mysql.select('account_like',{
            where:{
                id:id,
                username:username,
            }
        })
        return result.length == 1;
    }
}

module.exports = serviceGetdata;