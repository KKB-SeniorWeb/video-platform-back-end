import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { ARTICLE_CREATE, ARTICLE_UPDATE, ARTICLE_DELETE, ARTICLE_GET, ARTICLE_LIST } from '../../../app/const/index';

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

function updateTest(apiName) {
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
}

describe('test/app/controller/article.test.ts', () => {
  describe('/article/create 新建文章', () => {
    updateTest(ARTICLE_CREATE);

    it('新建文章成功', async () => {
      const token = generateToken();
      app.mockService('article', 'create', () => {
        return {};
      });
      const result = await app
        .httpRequest()
        .post(ARTICLE_CREATE)
        .set('Authorization', 'Bearer ' + token)
        .send(createArticle());
      assert(result.body.code === 1);
      assert(result.body.msg === '新建文章成功');
    });
  });
  describe('/article/update 编辑文章', () => {
    describe('id', async () => {
      it('当id为空的时候，返回文章id不能为空的消息', async () => {
        const token = generateToken();
        const result = await app
          .httpRequest()
          .post(ARTICLE_UPDATE)
          .set('Authorization', 'Bearer ' + token)
          .send({ id: '', ...createArticle() });

        assert(result.body.code === 0);
      });
    });

    updateTest(ARTICLE_UPDATE);

    it('更新文章成功', async () => {
      const token = generateToken();
      app.mockService('article', 'update', () => {
        return [];
      });
      const result = await app
        .httpRequest()
        .post(ARTICLE_UPDATE)
        .set('Authorization', 'Bearer ' + token)
        .send({ id: '已有文章id', ...createArticle() });

      assert(result.body.code === 1);
      assert(result.body.msg === '更新文章成功');
    });
  });
  describe('/article/delete', () => {
    describe('id', async () => {
      it('当id为空的时候，返回文章id不能为空的消息', async () => {
        const token = generateToken();
        const result = await app
          .httpRequest()
          .delete(ARTICLE_DELETE)
          .set('Authorization', 'Bearer ' + token)
          .send({ id: '', ...createArticle() });

        assert(result.body.code === 0);
      });
    });
    it('删除文章成功', async () => {
      const token = generateToken();
      app.mockService('article', 'delete', () => {
        return true;
      });
      const result = await app
        .httpRequest()
        .delete(ARTICLE_DELETE)
        .set('Authorization', 'Bearer ' + token)
        .send({ id: '已有文章id', ...createArticle() });

      assert(result.body.code === 1);
      assert(result.body.msg === '删除文章成功');
    });
  });
  describe('/article/get 获取文章', () => {
    describe('id', async () => {
      it('当id为空的时候，返回文章id不能为空的消息', async () => {
        const token = generateToken();
        const result = await app
          .httpRequest()
          .get(ARTICLE_GET)
          .set('Authorization', 'Bearer ' + token)
          .send({ id: '' });

        assert(result.body.code === 0);
      });
    });
    it('获取文章成功', async () => {
      const token = generateToken();
      app.mockService('article', 'findOne', () => {
        return true;
      });
      const result = await app
        .httpRequest()
        .get(ARTICLE_GET)
        .set('Authorization', 'Bearer ' + token)
        .send({ id: '已有文章id' });

      assert(result.body.code === 1);
      assert(result.body.msg === '获取文章成功');
    });
  });
  describe('/article/get/list 获取文章列表', () => {
    it('获取文章列表成功', async () => {
      const token = generateToken();
      app.mockService('article', 'findAll', () => {
        return true;
      });
      const result = await app
        .httpRequest()
        .get(ARTICLE_LIST)
        .set('Authorization', 'Bearer ' + token)
        .send();

      assert(result.body.code === 1);
      assert(result.body.msg === '获取文章列表成功');
    });
  });
});
