import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // 加载 errorHandler 中间件
  const middleware = ['errorHandler'];

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1582544882178_2333';

  config.jwt = {
    secret: '123456',
    sign: {
      expiresIn: '2h'
    }
  };

  // add your egg config in here
  config.middleware = [];
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  };
  // 匹配规则  域名+端口  *则为全匹配
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  const swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: '视频平台后端API',
      description: '视频平台后端API',
      version: '1.0.0'
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      // apikey: {
      //   type: 'apiKey',
      //   name: 'clientkey',
      //   in: 'header',
      // },
      // oauth2: {
      //   type: 'oauth2',
      //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
      //   flow: 'password',
      //   scopes: {
      //     'write:access_token': 'write access_token',
      //     'read:access_token': 'read access_token',
      //   },
      // },
    },
    enableSecurity: false,
    // enableValidate: true,
    routerMap: false,
    enable: true
  };

  const sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '123456',
    database: 'video_platform_development'
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    ...swaggerdoc,
    sequelize,
    middleware
  };
};
