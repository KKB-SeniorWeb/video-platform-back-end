import * as assert from 'assert';
import { Context } from 'egg';
import { app, mock } from 'egg-mock/bootstrap';

describe('test/app/service/Journal.test.ts', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });
  describe('getu 根据用户获取观看记录', () => {
    const parameter = {
      user_id: '用户id',
      type: 1,
      start: Date.now(),
      stop: Date.now(),
      limit: 20,
      offset: 1
    };
    it('获取观看记录成功', async () => {
      mock(app.model.Journal, 'findAll', () => {
        return [];
      });
      const resData = await ctx.service.journal.getuJournal(
        parameter.user_id,
        parameter.type,
        parameter.start,
        parameter.stop,
        parameter.limit,
        parameter.offset
      );
      assert(resData);
    });
  });
  describe('get 获取观看记录', () => {
    const parameter = {
      id: '教程id',
      type: 1,
      start: Date.now(),
      stop: Date.now(),
      limit: 20,
      offset: 1
    };
    it('获取观看记录成功', async () => {
      mock(app.model.Journal, 'findAll', () => {
        return [];
      });
      const resData = await ctx.service.journal.getJournal(
        parameter.id,
        parameter.type,
        parameter.start,
        parameter.stop,
        parameter.limit,
        parameter.offset
      );
      assert(resData);
    });
  });

  describe('add 添加观看记录', () => {
    const account = {
      id: '1',
      user_id: '用户id',
      type: 1,
      start: Date.now(),
      stop: Date.now()
    };
    describe('教程id', () => {
      it('添加教程观看记录如果教程不存在，返回错误', async () => {
        mock(app.model.Course, 'findOne', () => {
          return {
            toJSON() {
              return null;
            }
          };
        });
        try {
          await ctx.service.journal.addJournal(account.id, account.user_id, account.start, account.stop, account.type);
          assert.fail('应该抛出错误');
        } catch (e) {
          assert(e.message === '此 （教程/文章/视频） 已不存在');
        }
      });
    });
    it('添加观看记录成功', async () => {
      // mock-service操作 验证添加观看记录返回
      mock(app.model.Course, 'findOne', () => {
        return {
          toJSON() {
            return {
              id: '教程id',
              name: '教程名称',
              path: 'http://www.baidu.com/jiaohceng',
              visitor_number: 23,
              created_at: Date.now(),
              updated_at: Date.now()
            };
          }
        };
      });

      mock(app.model.Journal, 'create', () => {
        return {
          toJSON() {
            return {
              user_id: account.user_id
            };
          }
        };
      });

      const resData = await ctx.service.journal.addJournal(
        account.id,
        account.user_id,
        account.start,
        account.stop,
        account.type
      );
      assert(resData.watch_name === '教程名称');
      assert(resData.user_id === account.user_id);
    });
  });
});
