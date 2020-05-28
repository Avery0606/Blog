/* eslint valid-jsdoc: "off" */

'use strict';

module.exports = appInfo => {

  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + ' ';
  //数据库连接配置
  config.mysql = {
    client:{
      //host
      host:'localhost',
      //端口号
      port:'3306',
      //用户名
      user:'root',
      //密码
      password:'zhuoya520',
      //数据库名
      database:'blog'
    }
  };
  config.view = {
    defaultViewEngine:'.ejs',
    mapping:{
      '.html':'ejs',
    },
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:8080']
  };
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  

  return {
    ...config,
  };
};
