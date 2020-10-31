'use strict';

const Service = require("egg").Service;
class serviceUpdate extends Service{
    async serviceupdateLikenum(){
      let likenum = this.ctx.request.body.likenum
      let username = this.ctx.request.body.username
      let id = this.ctx.request.body.id
      let like_state = this.ctx.request.body.like_state
      let res = [];
      res.push(await this.app.mysql.update('article_likenum',{id:`${id}`,num:`${likenum}`}))
      if(!like_state){
        res.push(await this.app.mysql.insert('account_like',{username:`${username}`,id:`${id}`}))
      }else{
        res.push(await this.app.mysql.delete('account_like',{username:`${username}`,id:`${id}`}))
      }
      return res;
    }
}

module.exports = serviceUpdate;