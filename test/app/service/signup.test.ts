import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/Signup.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  describe('create 注册', () => {
    it('如果用户名已经注册的话，应该注册失败', async () => {
      const account = {
        username: 'cuixiaorui1',
        password: '1234567890'
      };

      app.mockService('user', 'checkUsernameIsExist', async () => {
        return true;
      });

      try {
        await ctx.service.signup.create(account);
        assert.fail('应该抛出错误');
      } catch (e) {
        assert(e.message === '用户名已经存在');
      }
    });

    it('如果是新用户的话，那么可注册', async () => {
      const account = {
        username: 'cuixiaorui1',
        password: '1234567890'
      };
      const result = await ctx.service.signup.create(account);
      assert(result.username);
      assert(result.id);
      assert(result.nickname);
      assert(result.avatar);
      //   assert(result.token);
    });
  });
});
