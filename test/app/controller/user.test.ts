import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

function generateToken(role = 'master') {
  const token = app.jwt.sign({ role }, app.config.jwt.secret);
  return token;
}

describe('test/app/controller/user.test.ts', () => {
  describe('查询单个用户 findOne', () => {
    it('当用户是管理员时，可以基于用户 id 查找用户信息', async () => {
      // given
      const userInfo = {
        id: '12312312l',
        username: 'chunqu',
        password: '123456',
        nickname: '昵称',
        avatar: 'test',
        role: 'master'
      };
      const token = generateToken(userInfo.role);

      // when
      app.mockService('user', 'findOne', () => Promise.resolve(userInfo));
      const result = await app
        .httpRequest()
        .post(`/users/${userInfo.id}`)
        .set('Authorization', 'Bearer ' + token)
        .set('id', userInfo.id)
        .send();

      // then
      const reqData = result.body.data;
      assert(result.status === 200);
      assert(reqData.id === userInfo.id);
      assert(reqData.username === userInfo.username);
      assert(reqData.nickname === userInfo.nickname);
      assert(reqData.avatar === userInfo.avatar);
    });
  });
});
