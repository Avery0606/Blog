'use strict';

const Service = require("egg").Service;
class servicePublish extends Service{
    async servicePublish(){
        let data = this.ctx.request.body;
        let username = data.username;
        let title = data.title;
        let article = data.article;
        let date = data.date;
        let res = this.app.mysql.insert('article',{username,title,article,date});
        return{
            code:1,
            msg:'发布成功',
            res
        }
    }
}

module.exports = servicePublish;