import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { JOURNAL_ADD, JOURNAL_GET, JOURNAL_GETU } from '../../../app/const/index';

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
function getParmas(info = {}) {
  const defaultInfo = {
    id: '教程id',
    type: 1,
    start: Date.now(),
    stop: Date.now(),
    limit: 20,
    offset: 1
  };
  return Object.assign({}, defaultInfo, info);
}
function getuParmas(info = {}) {
  const defaultInfo = {
    user_id: '用户id',
    type: 1,
    start: Date.now(),
    stop: Date.now(),
    limit: 20,
    offset: 1
  };
  return Object.assign({}, defaultInfo, info);
}
// e2e:
// given
// 准备要做的事情
// when
// 当添加记录时 -- (是否正确接收参数)  --  controller
// then
// 和正确结果作出比较，会有多少种情况

// success  -> response //先考虑成功情况
// fail  -> validate //再与错误情况做对比 相应处理边缘

describe('test/app/controller/journal.test.js', () => {
  describe('journal 根据用户获取观看记录', () => {
    const apiName = JOURNAL_GETU;
    describe('user_id', async () => {
      it('当用户id为空时 返回用户id不能为空的消息', async () => {
        const result = await app
          .httpRequest()
          .get(apiName)
          .send(getuParmas({ user_id: '' }));

        assert(result.body.code === 0);
      });
    });
    it('根据用户获取观看记录成功', async () => {
      app.mockService('journal', 'getuJournal', () => {
        return true;
      });
      const result = await app
        .httpRequest()
        .get(apiName)
        .send(getuParmas());

      assert(result.body.code === 1);
      assert(result.body.msg === '获取观看记录成功');
      assert(result.body.data === true);
    });
  });
  describe('journal 获取观看记录', () => {
    const apiName = JOURNAL_GET;
    describe('教程id', async () => {
      it('当观看的（教程）id为空时 返回教程id不能为空的消息', async () => {
        const result = await app
          .httpRequest()
          .get(apiName)
          .send(getParmas({ id: '' }));
        assert(result.body.code === 0);
      });
    });
    it('获取观看记录成功', async () => {
      app.mockService('journal', 'getJournal', () => {
        return true;
      });
      const result = await app
        .httpRequest()
        .get(apiName)
        .send(getParmas());

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
