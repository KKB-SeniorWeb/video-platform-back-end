import * as assert from 'assert';
import { Context } from 'egg';
import { app, mock } from 'egg-mock/bootstrap';
import * as sinon from 'sinon';
import { Role } from '../../../app/service/user';

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

  describe('修改用户密码', () => {
    let updateFakeFn;
    let newPassword;
    let confirmPassword;
    beforeEach(() => {
      updateFakeFn = sinon.fake.resolves([1]);
      mock(app.model.User, 'update', updateFakeFn);
      newPassword = 'abc456789';
      confirmPassword = 'abc456789';
    });

    describe('普通用户', () => {
      beforeEach(() => {
        setTokenToHeader(uId, Role.User);
      });
      it('普通用户可以修改自己的密码', async () => {
        // when
        const result = await ctx.service.user.changePassword({
          id: uId,
          newPassword,
          confirmPassword
        });

        // then
        assert(result === 1);
      });
      it('普通用户不可以修改其他人的密码', async () => {
        // given
        const targetUserId = 'aaaaaa';

        try {
          // when
          await ctx.service.user.changePassword({
            id: targetUserId,
            newPassword,
            confirmPassword
          });
          assert.fail('应该抛出错误');
        } catch (e) {
          // then
          assert(e.status === 401);
          assert(e.message === '没有权限');
        }
      });

      it('入库的密码不应该是明文', async () => {
        // when
        await ctx.service.user.changePassword({
          id: uId,
          newPassword,
          confirmPassword
        });

        // then
        assert(updateFakeFn.called);
        assert(updateFakeFn.firstArg.password !== newPassword);
      });
      it('入库失败的时候应该返回 400', async () => {
        // given
        updateFakeFn = sinon.fake.resolves([0]);
        mock(app.model.User, 'update', updateFakeFn);

        // when
        try {
          await ctx.service.user.changePassword({
            id: uId,
            newPassword,
            confirmPassword
          });
          assert.fail('应该抛出错误');
        } catch (e) {
          // then
          assert(e.status === 400);
          assert(e.message === '修改密码失败');
        }
      });

      it('密码和确认密码不一致的话，报错', async () => {
        // given
        confirmPassword = '1abc456789';

        try {
          // when
          await ctx.service.user.changePassword({
            id: uId,
            newPassword,
            confirmPassword
          });
          assert.fail('应该抛出错误');
        } catch (e) {
          // then
          assert(e.status === 400);
          assert(e.message === '密码和确认密码不一致');
        }
      });
    });

    describe('管理员', () => {
      beforeEach(() => {
        setTokenToHeader(uId, Role.Master);
      });
      it('管理员可以修改指定的用户的密码', async () => {
        // given
        const targetUserId = 'aaaaaa';

        // when
        const result = await ctx.service.user.changePassword({
          id: targetUserId,
          newPassword,
          confirmPassword
        });

        // then
        assert(result === 1);
      });
    });
  });

  describe('修改用户昵称', () => {
    const nickname = '春去春又来';
    describe('修改成功', () => {
      let updateFakeFn;
      beforeEach(() => {
        // given
        updateFakeFn = sinon.fake.resolves([1]);
        mock(app.model.User, 'update', updateFakeFn);
      });

      afterEach(async () => {
        // when
        const result = await ctx.service.user.changeNickname({
          id: uId,
          nickname
        });

        // then
        assert(result === 1);
        assert(updateFakeFn.called);
        assert(updateFakeFn.firstArg.nickname === nickname);
      });
      it('用户成功修改自己的昵称', async () => {
        // given
        setTokenToHeader(uId, Role.User);
      });

      it('管理员可以修改其他用户的昵称', async () => {
        // given
        setTokenToHeader('123456', Role.Master);
      });
    });

    describe('修改失败', () => {
      beforeEach(() => {
        const updateFakeFn = sinon.fake.resolves([0]);
        mock(app.model.User, 'update', updateFakeFn);
      });
      it('用户不可以修改其他人的昵称', async () => {
        // given
        setTokenToHeader('123456', Role.User);

        try {
          // when
          await ctx.service.user.changeNickname({
            id: uId,
            nickname
          });
          assert.fail('应该报错');
        } catch (e) {
          // then
          assert(e.status === 400);
          assert(e.message === '没有权限');
        }
      });
    });

    it('昵称没有变化的话，修改失败', async () => {
      // given
      setTokenToHeader(uId, Role.User);

      try {
        // when
        await ctx.service.user.changeNickname({
          id: uId,
          nickname
        });
        assert.fail('应该报错');
      } catch (e) {
        // then
        assert(e.status === 400);
        assert(e.message === '修改失败，昵称没有更新');
      }
    });
  });
});
