import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/Signin.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  describe('index 登录', () => {
    const account = {
      username: 'cuixiaorui1',
      password: '1234567890'
    };
    it('如果用户不存在的话，返回错误', async () => {
      app.mockService('user', 'checkUsernameIsExist', () => {
        return false;
      });

      try {
        await ctx.service.signin.index(account.username, account.password);
        assert.fail('应该抛出错误');
      } catch (e) {
        assert(e.message === '用户不存在');
      }
    });

    it('如果密码不正确的话，返回错误', async () => {
      app.mockService('user', 'checkUsernameIsExist', () => {
        return true;
      });
      app.mockService('signin', 'isMatch', () => {
        return false;
      });

      try {
        await ctx.service.signin.index(account.username, account.password);
        assert.fail('应该抛出错误');
      } catch (e) {
        assert(e.message === '账号或者密码错误');
      }
    });
  });
});
