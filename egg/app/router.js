'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/home',controller.controllerLogin.Loginpage);//进入登陆主页
  // router.get('/register', controller.controllerRegister.controllerRegister);//当访问'/'路径，执行register方法
  router.post('/commit',controller.controllerRegister.getInput);//点击注册后，执行的方法
  router.post('/login',controller.controllerLogin.judgeLogin);//点击登录后执行
  router.post('/publish',controller.controllerPublish.publish);//点击发布后执行

  router.get('/getData/getUsername',controller.controllerGetdata.getUsername)//获取用户名字
  router.get('/getData/getAllArticle',controller.controllerGetdata.getAllArticle)//获取所有文章
  router.get('/getData/getThisArticle',controller.controllerGetdata.getThisArticle)//获取指定文章
};
