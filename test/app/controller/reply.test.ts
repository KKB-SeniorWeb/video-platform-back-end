import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { REPLY_PUSH, REPLY_ONE, REPLY_LIST } from '../../../app/const/index';

function generateToken(role = 'master') {
  const token = app.jwt.sign({ role }, app.config.jwt.secret);
  return token;
}
function createReply(info = {}) {
  const defaultInfo = {
    userId: '用户id',
    watchId: '文章id',
    reply: '评论内容'
  };
  return Object.assign({}, defaultInfo, info);
}
function TestPush(resources: string) {
  let token;
  const apiName = REPLY_PUSH + '/' + resources;
  beforeEach(async () => {
    token = generateToken();
  });
  describe('watchId', () => {
    it(`watchId为空时,返回${resources}id不能为空的消息`, async () => {
      app.mockService('reply', 'push', () => {
        return true;
      });
      const result = await app
        .httpRequest()
        .post(apiName)
        .set('Authorization', 'Bearer ' + token)
        .send(createReply({ watchId: '' }));

      assert(result.body.code === 0);
    });
  });
  describe('userId', () => {
    it('userId为空时,返回用户id不能为空的消息', async () => {
      app.mockService('reply', 'push', () => {
        return true;
      });
      const result = await app
        .httpRequest()
        .post(apiName)
        .set('Authorization', 'Bearer ' + token)
        .send(createReply({ userId: '' }));

      assert(result.body.code === 0);
    });
  });
  describe('reply', () => {
    it('reply为空时,返回评论内容不能为空的消息', async () => {
      app.mockService('reply', 'push', () => {
        return true;
      });
      const result = await app
        .httpRequest()
        .post(apiName)
        .set('Authorization', 'Bearer ' + token)
        .send(createReply({ reply: '' }));

      assert(result.body.code === 0);
    });
  });
  it('发表评论成功', async () => {
    app.mockService('reply', 'push', () => {
      return true;
    });
    const result = await app
      .httpRequest()
      .post(apiName)
      .set('Authorization', 'Bearer ' + token)
      .send(createReply());
    assert(result.body.code === 1);
    assert(result.body.msg === '发表评论成功');
  });
}

function TestGet(resources: string) {
  const apiName = REPLY_LIST + '/' + resources;
  let token;
  beforeEach(async () => {
    token = await generateToken();
  });
  it(`获取${resources}列表成功`, async () => {
    app.mockService('reply', 'getList', () => {
      return true;
    });
    const result = await app
      .httpRequest()
      .get(apiName)
      .set('Authorization', 'Bearer ' + token)
      .send({ id: '评论id' });

    assert(result.body.code === 1);
    assert(result.body.msg === '获取评论列表成功');
  });
}

describe('test/app/controller/reply.test.ts', () => {
  describe('/reply/push/article 发表文章评论', () => {
    TestPush('article');
  });
  describe('/reply/push/video 发表视频评论', () => {
    TestPush('video');
  });
  describe('/reply/get 获取单个评论', () => {
    const apiName = REPLY_ONE;
    let token;
    beforeEach(async () => {
      token = await generateToken();
    });
    describe('id', () => {
      it('id为空时,返回id不能为空的消息', async () => {
        app.mockService('reply', 'get', () => {
          return true;
        });
        const result = await app
          .httpRequest()
          .get(apiName)
          .set('Authorization', 'Bearer ' + token)
          .send({ id: '' });

        assert(result.body.code === 0);
      });
    });
    it('获取单个评论成功', async () => {
      app.mockService('reply', 'get', () => {
        return true;
      });
      const result = await app
        .httpRequest()
        .get(apiName)
        .set('Authorization', 'Bearer ' + token)
        .send({ id: '评论id' });

      assert(result.body.code === 1);
      assert(result.body.msg === '获取评论成功');
    });
  });
  describe('reply/get/list/article 获取文章评论列表', () => {
    TestGet('article');
  });
  describe('reply/get/list/video 获取视频评论列表', () => {
    TestGet('video');
  });
});
