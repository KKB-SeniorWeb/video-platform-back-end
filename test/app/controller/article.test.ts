import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { ARTICLE_CREATE } from '../../../app/const/index';

function generateToken(role = 'master') {
  const token = app.jwt.sign({ role }, app.config.jwt.secret);
  return token;
}
function createArticle(info = {}) {
  const defaultInfo = {
    title: '标题',
    cover: '文章封面',
    describe: '文章描述',
    content: '文章具体内容',
    authorId: 'id'
  };
  return Object.assign({}, defaultInfo, info);
}

describe('test/app/controller/article.test.ts', () => {
  // 哪个文件
  describe('article/create 新建文章', () => {
    // 哪个接口
    const apiName = ARTICLE_CREATE;
    describe('title', async () => {
      it('当title为空的时候，返回文章标题不能为空的消息', async () => {
        const token = generateToken();
        const result = await app
          .httpRequest()
          .post(apiName)
          .set('Authorization', 'Bearer ' + token)
          .send(createArticle({ title: '' }));

        assert(result.body.code === 0);
      });
    });
    describe('cover', async () => {
      it('当cover为空的时候，返回文章标题不能为空的消息', async () => {
        const token = generateToken();
        const result = await app
          .httpRequest()
          .post(apiName)
          .set('Authorization', 'Bearer ' + token)
          .send(createArticle({ cover: '' }));

        assert(result.body.code === 0);
      });
    });

    describe('describe', async () => {
      it('当describe为空的时候，返回文章标题不能为空的消息', async () => {
        const token = generateToken();
        const result = await app
          .httpRequest()
          .post(apiName)
          .set('Authorization', 'Bearer ' + token)
          .send(createArticle({ describe: '' }));

        assert(result.body.code === 0);
      });
    });
    describe('content', async () => {
      it('当content为空的时候，返回文章标题不能为空的消息', async () => {
        const token = generateToken();
        const result = await app
          .httpRequest()
          .post(apiName)
          .set('Authorization', 'Bearer ' + token)
          .send(createArticle({ content: '' }));

        assert(result.body.code === 0);
      });
    });
    describe('authorId', async () => {
      it('当authorId为空的时候，返回文章标题不能为空的消息', async () => {
        const token = generateToken();
        const result = await app
          .httpRequest()
          .post(apiName)
          .set('Authorization', 'Bearer ' + token)
          .send(createArticle({ authorId: '' }));

        assert(result.body.code === 0);
      });
    });
    it('新建文章成功', async () => {
      const token = generateToken();
      app.mockService('article', 'create', () => {
        return {};
      });
      const result = await app
        .httpRequest()
        .post(apiName)
        .set('Authorization', 'Bearer ' + token)
        .send(createArticle());

      assert(result.body.code === 1);
      assert(result.body.msg === '新建文章成功');
    });
  });
});
