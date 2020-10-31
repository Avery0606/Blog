'use strict';

const Service = require("egg").Service;
class servicePublish extends Service{
    async servicePublish(){
        let data = this.ctx.request.body;
        let username = data.username;
        let title = data.title;
        let article = data.article;
        let date = data.date;
        const conn = await this.app.mysql.beginTransaction();
        var res = await this.app.mysql.insert('article',{username,title,article,date});
        if(res.affectedRows == 1)return{
            code:1,
            msg:'发布成功',
            res
        }
        
    }
}

module.exports = servicePublish;