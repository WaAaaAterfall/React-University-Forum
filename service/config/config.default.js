/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1656832996033_4149';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      // host: 'localhost',
      host: '', //
      // port
      // port: '8889',
      port: '3306',
      // username
      user: 'root',
      // password
      // password: 'root',
      password: '',
      // database
      database: 'react_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  // 跨域
  config.security = {
    csrf: { enable: false },
    domainWitheList: [ 'http://localhost:3001', 'http://localhost:3001/', 'http://localhost:3000', 'http://127.0.0.1:7003', 'http://localhost:3000/' ],
    // domainWitheList: [ '*' ],
  };

  config.cors = {
    // origins: [ 'http://localhost:3000', 'http://localhost:3001' ],
    origin: 'http://localhost:3000',
    credentials: true, // 允许cookie跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // config.cors = {
  //   origin: 'http://127.0.0.1:7001',
  //   credentials: true, // 允许cookie跨域
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  // };


  return {
    ...config,
    ...userConfig,
  };
};
