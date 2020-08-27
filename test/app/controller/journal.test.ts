import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { JOURNAL_ADD, JOURNAL_USER, JOURNAL_ID } from '../../../app/const/index';

function generateToken(role = 'master') {
  const token = app.jwt.sign({ role }, app.config.jwt.secret);
  return token;
}
function createJournal(info = {}) {
  const defaultInfo = {
    id: '教程id',
    type: 1,
    userId: '用户id',
    start: Date.now(),
    stop: Date.now()
  };
  return Object.assign({}, defaultInfo, info);
}
function getByIdParmas(info = {}) {
  const defaultInfo = {
    id: '教程id',
    type: 1,
    limit: 20,
    offset: 1
  };
  return Object.assign({}, defaultInfo, info);
}
function getByUserParmas(info = {}) {
  const defaultInfo = {
    userId: '用户id',
    type: 1,
    limit: 20,
    offset: 1
  };
  return Object.assign({}, defaultInfo, info);
}

describe('test/app/controller/journal.test.js', () => {
  describe('journal 根据用户获取教程教程观看记录', () => {
    const apiName = JOURNAL_USER + '/course';
    describe('userId', async () => {
      it('当用户id为空时 返回用户id不能为空的消息', async () => {
        const result = await app
          .httpRequest()
          .get(apiName)
          .query(getByUserParmas({ userId: '' }));
        assert(result.body.code === 0);
      });
    });
    it('根据用户获取观看记录成功', async () => {
      app.mockService('journal', 'getByUser', () => {
        return true;
      });
      const result = await app
        .httpRequest()
        .get(apiName)
        .query(getByUserParmas());

      assert(result.body.code === 1);
      assert(result.body.msg === '获取观看记录成功');
      assert(result.body.data === true);
    });
  });
  describe('journal 根据id获取观看记录', () => {
    const apiName = JOURNAL_ID + '/course';
    describe('教程id', async () => {
      it('当观看的教程id为空时 返回教程id不能为空的消息', async () => {
        const result = await app
          .httpRequest()
          .get(apiName)
          .query(getByIdParmas({ id: '' }));

        assert(result.body.code === 0);
      });
    });
    it('获取观看记录成功', async () => {
      app.mockService('journal', 'getById', () => {
        return true;
      });
      const result = await app
        .httpRequest()
        .get(apiName)
        .query(getByIdParmas());

      assert(result.body.code === 1);
      assert(result.body.msg === '获取观看记录成功');
      assert(result.body.data === true);
    });
  });
  describe('journal 添加观看记录', () => {
    const apiName = JOURNAL_ADD + '/course';
    describe('userId', () => {
      it('当用户id为空时 返回用户id不能为空的消息', async () => {
        const token = generateToken();
        const result = await app
          .httpRequest()
          .post(apiName)
          .set('Authorization', 'Bearer ' + token)
          .send(createJournal({ userId: '' }));

        assert(result.body.code === 0);
      });
    });
    describe('id', () => {
      it('当id为空时 返回（教程/文章/视频）id不能为空的消息', async () => {
        const token = generateToken();
        const result = await app
          .httpRequest()
          .post(apiName)
          .set('Authorization', 'Bearer ' + token)
          .send(createJournal({ id: '' }));

        assert(result.body.code === 0);
      });
    });

    it('添加观看记录成功', async () => {
      const token = generateToken();
      app.mockService('journal', 'add', () => {
        return true;
      });
      const result = await app
        .httpRequest()
        .post(apiName)
        .set('Authorization', 'Bearer ' + token)
        .send(createJournal());

      assert(result.body.code === 1);
      assert(result.body.msg === '添加观看记录成功');
      assert(result.body.data === true);
    });
  });
});
