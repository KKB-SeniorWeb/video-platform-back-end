import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { Role } from '../../../app/service/user';
import { UserVo } from '../../../app/controller/user';

function generateToken(role = 'master', uId = '123456') {
  const token = app.jwt.sign({ role, uId }, app.config.jwt.secret);
  return token;
}

function createUserEntity() {
  return {
    id: '12312312l',
    username: 'chunqu',
    nickname: '昵称',
    avatar: 'test'
  };
}

function assertEqualToUserVo(obj) {
  const userVo = new UserVo(obj);
  assert.deepEqual(obj, userVo.toJSON());
}

describe('test/app/controller/user.test.ts', () => {
  describe('查询单个用户 findOne', () => {
    it('当用户是管理员时，可以基于用户 id 查找用户信息', async () => {
      // given
      const userEntity = createUserEntity();
      const token = generateToken(Role.User);

      // when
      app.mockService('user', 'findOne', () => Promise.resolve(userEntity));
      const result = await app
        .httpRequest()
        .get(`/users/${userEntity.id}`)
        .set('Authorization', 'Bearer ' + token)
        .send();

      // then
      const userVo = result.body.data;
      assert(result.status === 200);
      assertEqualToUserVo(userVo);
    });
  });

  describe('查看用户列表', () => {
    it('管理员可以查看用户列表', async () => {
      // given
      const userEntitys = [createUserEntity(), createUserEntity()];
      const token = generateToken(Role.Admin);

      // when
      const userTotalNumber = userEntitys.length;
      app.mockService('user', 'findAll', () => Promise.resolve(userEntitys));
      app.mockService('user', 'getUserTotalNumber', () => userTotalNumber);
      const page = 1;
      const limit = 5;
      const result = await app
        .httpRequest()
        .get(`/users?page=${page}&limit=${limit}`)
        .set('Authorization', 'Bearer ' + token)
        .send();

      // then
      const reqData = result.body.data;
      assert(result.status === 200);
      assert(reqData.userLen === userTotalNumber);
      assertEqualToUserVo(reqData.data[0]);
    });
  });

  describe('删除用户', () => {
    it('管理员可以删除指定用户', async () => {
      // given
      const token = generateToken(Role.Admin);
      const entity = createUserEntity();

      // when
      app.mockService('user', 'deleteUser', () => Promise.resolve(true));
      const result = await app
        .httpRequest()
        .delete(`/users/${entity.id}`)
        .set('Authorization', 'Bearer ' + token)
        .send();

      // then
      const reqData = result.body.data;
      assert(result.status === 200);
      assert(reqData);
    });
  });

  it('修改用户密码', async () => {
    // given
    const selfUserId = '1234567';
    const targetUserId = '1234567';
    const token = generateToken(Role.User, selfUserId);
    const newPassword = 'newabcdef123';
    const confirmPassword = 'newabcdef123';

    app.mockService('user', 'changePassword', () => {
      return true;
    });

    // when
    const result = await app
      .httpRequest()
      .patch(`/users/${targetUserId}`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        newPassword,
        confirmPassword
      });

    // then
    assert(result.status === 200);
    assert(result.body.msg === '修改成功');
  });

  it('修改用户昵称', async () => {
    // given
    const token = generateToken(Role.Admin);
    const entity = createUserEntity();
    const nickname = '春去春又来';

    app.mockService('user', 'changeNickname', () => {
      return true;
    });

    // when
    const result = await app
      .httpRequest()
      .patch(`/users/${entity.id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .send({
        nickname
      });

    // then
    const userVo = result.body.data;
    assert(result.body.msg === '修改成功');
    assert(userVo.nickname === '春去春又来');
  });
});
