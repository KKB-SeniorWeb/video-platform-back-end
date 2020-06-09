import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { JOURNAL_ADD, JOURNAL_GETBYUSER, JOURNAL_GETBYID } from '../../../app/const/index';

function createJournal(info = {}) {
  const defaultInfo = {
    id: '教程id',
    user_id: '用户id',
    type: 1,
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
    user_id: '用户id',
    type: 1,
    limit: 20,
    offset: 1
  };
  return Object.assign({}, defaultInfo, info);
}

describe('test/app/controller/journal.test.js', () => {
  describe('journal 根据用户获取观看记录', () => {
    const apiName = JOURNAL_GETBYUSER;
    describe('user_id', async () => {
      it('当用户id为空时 返回用户id不能为空的消息', async () => {
        const result = await app
          .httpRequest()
          .get(apiName)
          .send(getByUserParmas({ user_id: '' }));

        assert(result.body.code === 0);
      });
    });
    it('根据用户获取观看记录成功', async () => {
      app.mockService('journal', 'getByUserJournal', () => {
        return true;
      });
      const result = await app
        .httpRequest()
        .get(apiName)
        .send(getByUserParmas());

      assert(result.body.code === 1);
      assert(result.body.msg === '获取观看记录成功');
      assert(result.body.data === true);
    });
  });
  describe('journal 获取观看记录', () => {
    const apiName = JOURNAL_GETBYID;
    describe('教程id', async () => {
      it('当观看的（教程）id为空时 返回教程id不能为空的消息', async () => {
        const result = await app
          .httpRequest()
          .get(apiName)
          .send(getByIdParmas({ id: '' }));
        assert(result.body.code === 0);
      });
    });
    it('获取观看记录成功', async () => {
      app.mockService('journal', 'getByIdJournal', () => {
        return true;
      });
      const result = await app
        .httpRequest()
        .get(apiName)
        .send(getByIdParmas());

      assert(result.body.code === 1);
      assert(result.body.msg === '获取观看记录成功');
      assert(result.body.data === true);
    });
  });
  describe('journal 添加观看记录', () => {
    const apiName = JOURNAL_ADD;
    describe('user_id', () => {
      it('当用户id为空时 返回用户id不能为空的消息', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createJournal({ user_id: '' }));

        assert(result.body.code === 0);
      });
    });
    describe('id', () => {
      it('当id为空时 返回（教程/文章/视频）id不能为空的消息', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createJournal({ id: '' }));

        assert(result.body.code === 0);
      });
    });

    it('添加观看记录成功', async () => {
      app.mockService('journal', 'addJournal', () => {
        return true;
      });
      const result = await app
        .httpRequest()
        .post(apiName)
        .send(createJournal());

      assert(result.body.code === 1);
      assert(result.body.msg === '添加观看记录成功');
      assert(result.body.data === true);
    });
  });
});
