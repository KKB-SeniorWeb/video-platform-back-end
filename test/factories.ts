import { factory } from 'factory-girl';

export const setup = app => {
  // 可以通过 app.factory 访问 factory 实例
  app.factory = factory;
  // 定义 user 和默认数据
  factory.define('user', app.model.User, {
    id: Date.now() + '_id',
    username: factory.sequence('User.username', n => `username_${n}`),
    password: '123456',
    nickname: factory.sequence('User.nickname', n => `nickname_${n}`),
    avatar: 'test',
    role: 'master'
  });
  factory.define('article', app.model.Article, {
    id: Date.now() + '_id',
    title: '文章标题',
    cover: '文章封面',
    describe: '文章描述',
    content: '内容',
    author_id: factory.sequence('User.id', n => `author_id_${n}`),
    hot: 0
  });
};

export const cleanup = async () => {
  // hack 防止 factory 抛出重复定义的错误
  // 在 setup 的时候 factory 会检测是否重复定义过
  // 如果重复定义过的话，会抛出错误
  delete factory.factories.user;
  delete factory.factories.article;
  await factory.cleanUp();
};
