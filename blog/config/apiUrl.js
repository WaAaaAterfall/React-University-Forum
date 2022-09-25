let ipUrl = 'http://127.0.0.1:7003/default/';

let servicePath = {
    getArticleList : ipUrl + 'getArticleList',  // 首页接口
    getArticleById : ipUrl + 'getArticleById/',  // 详细页接口
    getCommentsByArticle : ipUrl + 'getCommentsByArticle/',  // 根据 article id 获取评论
    getTypeInfo : ipUrl + 'getTypeInfo',  // 文章类别接口
    getListById : ipUrl + 'getListById/',  // 根据 type id 获得文章列表
    addComment : ipUrl + 'addComment',  // 添加评论
}

export default servicePath;