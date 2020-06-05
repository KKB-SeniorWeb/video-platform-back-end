import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { Role } from '../../app/service/user';
import { UserVo } from '../../app/controller/user';

function generateToken(role = 'master') {
  const token = app.jwt.sign({ role }, app.config.jwt.secret);
  return token;
}

function assertEqualToUserVo(obj) {
  const userVo = new UserVo(obj);
  assert.deepEqual(obj, userVo.toJSON());
}

describe('test/app/controller/user.test.ts', () => {
  it('查询单个用户 findOne', async () => {
    // given
    const userModel = {
      id: '123',
      username: 'chunqu11',
      password: 'mima',
      nickname: 'hahah',
      avatar: 'test',
      role: Role.Admin
    };
    const token = generateToken(userModel.role);
    await (app as any).factory.create('user', userModel);

    // when
    const result = await app
      .httpRequest()
      .get(`/users/${userModel.id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .send();

    // then
    const userVo = result.body.data;
    assertEqualToUserVo(userVo);
  });
});
