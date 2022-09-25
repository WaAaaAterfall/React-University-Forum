// 后台验证用户，路由守卫

module.exports = () => {
  return async function adminauth(ctx, next) {
    // console.log('adminauth ctx = ', ctx);
    ctx.session.openId = 1657237170759;
    console.log('adminauth session = ', ctx.session);
    if (ctx.session.openId) { // 已登录，往下执行
      console.log('登录成功');
      await next;
    } else {
      console.log('没有登录');
      ctx.body = { data: '没有登录' };
    }
  };
};
