'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {

    // const result = await this.app.mysql.get('blog_content', {});
    // console.log(result);

    const { ctx } = this;
    ctx.body = 'result';
  }

  // 通过id获取文章列表（intro）
  async getArticleList() {
    const sql1 = 'SELECT article.id as id ,' +
              'article.title as title ,' +
              'article.intro as intro ,' +
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
              'article.view_count as view_count ,' +
              'type.typeName as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id';

    const results = await this.app.mysql.query(sql1);
    const { ctx } = this;
    ctx.body = { data: results };
  }

  // 通过id获取文章详细内容（details）
  async getArticleById() {

    const id = this.ctx.params.id;

    const sql2 = 'SELECT article.id as id ,' +
              'article.title as title ,' +
              'article.intro as intro ,' +
              'article.article_content as article_content ,' +
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
              'article.view_count as view_count ,' +
              'type.typeName as typeName ,' +
              'type.id as typeId ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id ' +
              'WHERE article.id=' + id;
    const result2 = await this.app.mysql.query(sql2);
    const { ctx } = this;
    ctx.body = { data: result2 };
  }

  // 根据文章id获取评论
  async getCommentsByArticle() {
    const articleId = this.ctx.params.id;
    console.log('articleId: ', articleId);
    // const articleId = 3;
    const sql3 = 'SELECT comments.id as id ,' +
              'comments.content as content ,' +
              'comments.addTime as addTime ,' +
              'comments.likes as likes ,' +
              'comments.userId as userId ,' +
              'comments.userName as userName ' +
              'FROM comments LEFT JOIN article ON comments.article_id = article.id ' +
              'WHERE article_id=' + articleId + ' ' +
              'ORDER BY comments.id DESC'; // 倒序
    const result3 = await this.app.mysql.query(sql3);
    const { ctx } = this;
    ctx.body = { data: result3 };
  }

  // 添加评论
  async addComment() {
    console.log('----- insert comment -----');
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

  // 根据user id获取用户信息
  async getUserById() {
    // const articleId = this.ctx.params.articleId;
    const userId = 3;
    const sql3 = 'SELECT admin_user.id as id ,' +
              'admin_user.userName as userName ' +
              // 'FROM admin_user LEFT JOIN article ON comments.article_id = article.id ' +
              'WHERE id=' + userId;
    const result3 = await this.app.mysql.query(sql3);
    const { ctx } = this;
    ctx.body = { data: result3 };
  }

  // 得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

  // 根据 type id 获得文章列表
  async getListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id ,' +
              'article.title as title ,' +
              'article.intro as intro ,' +
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
              'article.view_count as view_count ,' +
              'type.typeName as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id ' +
              'WHERE type_id=' + id;

    const results = await this.app.mysql.query(sql);
    const { ctx } = this;
    ctx.body = { data: results };
  }
}

module.exports = HomeController;
