'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  require('./router/default')(app);
  require('./router/admin')(app);
  // require('./router/home')(app);
  // const { router, controller } = app;
  // router.get('/', controller.home.index);
  // router.get('/default/home', controller.home.index);
};
