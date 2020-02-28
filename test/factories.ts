import { factory } from 'factory-girl';

export const setup = app => {
  // 可以通过 app.factory 访问 factory 实例
  app.factory = factory;
  // 定义 user 和默认数据
  factory.define('user', app.model.User, {
    username: factory.sequence('User.username', n => `username_${n}`)
  });
};

export const cleanup = async () => {
  // hack 防止 factory 抛出重复定义的错误
  // 在 setup 的时候 factory 会检测是否重复定义过
  // 如果重复定义过的话，会抛出错误
  delete factory.factories.user;
  await factory.cleanUp();
};
