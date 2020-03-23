import * as assert from 'assert';
import { Context } from 'egg';
import { app, mock } from 'egg-mock/bootstrap';
import * as sinon from 'sinon';

function generateToken(uId: string, role = 'user') {
  const token = app.jwt.sign({ uId, role }, app.config.jwt.secret);
  return token;
}

const uId = '12312312l';

class FakeUserEntity {
  public id = '12312312l';
  public username = 'chunqu';
  public nickname = '昵称';
  public avatar = 'test';

  public toJSON() {
    return {
      id: this.id,
      username: this.username,
      nickname: this.nickname,
      avatar: this.avatar
    };
  }
}

function assertEqualToUserEntity(entity) {
  const fakeUserEntity = new FakeUserEntity();
  assert.deepEqual(fakeUserEntity.toJSON(), entity);
}

function assertNoPermission(e) {
  assert(e.status === 401);
  assert(e.message === '没有权限');
}

describe('test/app/service/user.test.js', () => {
  let ctx: Context;

  function setTokenToHeader(uId, role) {
    const token = generateToken(uId, role);
    ctx.header.authorization = 'Bearer ' + token;
  }

  before(async () => {
    ctx = app.mockContext();
  });

  describe('查询单个用户 findOne', () => {
    beforeEach(() => {
      mock(app.model.User, 'findOne', () => new FakeUserEntity());
    });

    it('普通用户可以查看自己的信息', async () => {
      setTokenToHeader(uId, 'user');
      const userEntity = await ctx.service.user.findOne(uId);

      assertEqualToUserEntity(userEntity);
    });
    it('管理员可以查看别人的信息', async () => {
      const otherUId = 'abc';

      setTokenToHeader(uId, 'admin');
      const userEntity = await ctx.service.user.findOne(otherUId);

      assertEqualToUserEntity(userEntity);
    });

    it('普通用户不可以查看别人的信息', async () => {
      const otherUId = 'abc';
      setTokenToHeader(uId, 'user');
      try {
        await ctx.service.user.findOne(otherUId);
        assert.fail('应该抛出错误');
      } catch (e) {
        assertNoPermission(e);
      }
    });
  });

  describe('查询用户列表', () => {
    const userEntitys: any = [new FakeUserEntity(), new FakeUserEntity()];
    beforeEach(() => {
      mock(app.model.User, 'findAll', sinon.fake.resolves(userEntitys));
    });
    it('当查询page=1，limit = 5时，返回用户列表', async () => {
      // given
      setTokenToHeader(uId, 'admin');
      // when
      const result = await ctx.service.user.findAll(1, 5);
      // then
      assert(
        result,
        userEntitys.map(entity => entity.toJSON())
      );
      assert(
        ctx.model.User.findAll.calledWith({
          offset: 0,
          limit: 5
        })
      );
    });
  });

  describe('删除用户', () => {
    beforeEach(() => {
      mock(app.model.User, 'destroy', sinon.fake.resolves(true));
    });
    it('管理员可以删除指定的用户', async () => {
      const otherUId = 'abc';

      setTokenToHeader(uId, 'admin');
      const result = await ctx.service.user.deleteUser(otherUId);
      assert(result);
      assert(
        ctx.model.User.destroy.calledWith({
          where: {
            id: otherUId
          }
        })
      );
    });

    it('不可以删除自己', async () => {
      setTokenToHeader(uId, 'admin');
      try {
        await ctx.service.user.deleteUser(uId);
        assert.fail('应该抛出错误');
      } catch (e) {
        assert(e.status === 400);
        assert(e.message === '不能删除自己');
      }
    });
  });
});
