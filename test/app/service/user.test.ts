import * as assert from 'assert';
import { Context } from 'egg';
import { app, mock } from 'egg-mock/bootstrap';

function generateToken(uId: string, role = 'user') {
  const token = app.jwt.sign({ uId, role }, app.config.jwt.secret);
  return token;
}

describe('test/app/service/Test.test.js', () => {
  describe('查找一个用户的信息 findOne', () => {
    let ctx: Context;
    const userInfo = {
      id: '12312312l',
      username: 'chunqu',
      password: '123456',
      nickname: '昵称',
      avatar: 'test',
      role: 'user'
    };

    before(async () => {
      ctx = app.mockContext();
    });

    beforeEach(() => {
      mock(app.model.User, 'findOne', () =>
        Promise.resolve({
          toJSON() {
            return userInfo;
          }
        })
      );
    });

    function setTokenToHeader(uId, role) {
      const token = generateToken(uId, role);
      ctx.header.authorization = 'Bearer ' + token;
    }

    it('普通用户可以查看自己的信息', async () => {
      setTokenToHeader(userInfo.id, 'user');
      const result = await ctx.service.user.findOne(userInfo.id);

      assert.equal(result, userInfo);
    });
    it('管理员可以查看别人的信息', async () => {
      const otherUId = 'abc';
      setTokenToHeader(userInfo.id, 'admin');
      const result = await ctx.service.user.findOne(otherUId);

      assert.equal(result, userInfo);
    });

    it('普通用户不可以查看别人的信息', async () => {
      const otherUId = 'abc';
      setTokenToHeader(userInfo.id, 'user');
      try {
        await ctx.service.user.findOne(otherUId);
        assert.fail('应该抛出错误');
      } catch (e) {
        assert(e.status === 401);
        assert(e.message === '没有权限');
      }
    });
  });
});
