'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index);
  router.get('/default/getArticleList', controller.default.home.getArticleList);
  router.get('/default/getCommentsByArticle/:id', controller.default.home.getCommentsByArticle); // 根据article id 获取 comments
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById);
  router.get('/default/getTypeInfo', controller.default.home.getTypeInfo);
  router.get('/default/getListById/:id', controller.default.home.getListById);

  router.get('/default/getUserById/:id', controller.default.home.getUserById); // 根据article id 获取 comments
  router.post('/default/addComment', controller.admin.main.addComment); // 添加comment

};
