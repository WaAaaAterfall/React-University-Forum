'use strict'; // 严格模式

const Controller = require('egg').Controller; // 引来controller

class MainController extends Controller {
  async index() {
    this.ctx.body = 'hi api';
  }

  // 登陆方法
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = "SELECT userName FROM admin_user WHERE userName = '" + userName + "' AND password = '" + password + "'";
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      const openId = new Date().getTime();
      // this.ctx.session = { 'openId': openId };
      this.ctx.session = { openId };
      // this.ctx.body = { 'data': '登录成功', 'openId': openId };
      this.ctx.body = { data: '登录成功', openId };
      console.log('session.openId =', this.ctx.session.openId);

    } else {
      // this.ctx.body = { 'data': '登录失败' };
      this.ctx.body = { data: '登录失败' };
    }
  }

  // 类型守卫，获取type信息
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }

  // 添加文章
  async addArticle() {
    console.log('66666666');
    const tempArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', tempArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId; // 插入操作的id

    this.ctx.body = {
      isSuccess: insertSuccess, // 是否插入成功
      // insertId: insertId,
      insertId,
    };
  }

  // 添加评论
  async addComment() {
    const tempComment = this.ctx.request.body;
    const result = await this.app.mysql.insert('comments', tempComment);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId; // 插入操作的id
    this.ctx.body = {
      isSuccess: insertSuccess, // 是否插入成功
      // insertId: insertId,
      insertId,
    };
  }

  // 更新文章
  async updateArticle() {
    const tempArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('article', tempArticle); // (表，内容)
    const updateSuccess = result.affectedRows === 1; // 有一行发生改变，成功
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  // 获取文章列表
  async getArticleList() {
    console.log('55555555');

    // console.log('正在 getArticleList');
    const sql = 'SELECT article.id as id ,' +
                'article.title as title ,' +
                'article.intro as intro ,' +
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
                'article.view_count as view_count ,' +
                'type.typeName as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.id ' +
                'ORDER BY article.id DESC'; // 倒序

    const resList = await this.app.mysql.query(sql);
    const { ctx } = this;
    ctx.body = { list: resList };
    // console.log('getArticleList 完成');
  }

  async delArticle() {
    console.log('3333333');
    const id = this.ctx.params.id;
    // const res = await this.app.mysql.delete('article', { 'id': id });
    const res = await this.app.mysql.delete('article', { id });
    const { ctx } = this;
    ctx.body = { data: res };
    console.log('11111111');
  }

  // 用文章ID获取文章，修改
  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id ,' +
                'article.title as title ,' +
                'article.intro as intro ,' +
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
                'article.view_count as view_count ,' +
                'type.typeName as typeName ' +
                'type.id as typeId ' +
                'FROM article LEFT JOIN type ON article.type_id = type.id ' +
                'WHERE article.id = ' + id;

    const result = await this.app.mysql.query(sql);
    const { ctx } = this;
    // ctx.body = { list: result };
    ctx.body = { data: result };
  }
}

module.exports = MainController;
