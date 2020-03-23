import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { Role } from '../../../app/service/user';
import { UserVo } from '../../../app/controller/user';

function generateToken(role = 'master') {
  const token = app.jwt.sign({ role }, app.config.jwt.secret);
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
        .post(`/users/${userEntity.id}`)
        .set('Authorization', 'Bearer ' + token)
        .set('id', userEntity.id)
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
});
