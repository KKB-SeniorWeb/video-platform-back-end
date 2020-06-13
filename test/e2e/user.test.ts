import { SIGNIN } from '../../app/const';
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

async function createUserModelToDB() {
  const userModel = {
    id: '123',
    username: 'chunqu11',
    password: 'mima',
    nickname: 'hahah',
    avatar: 'test',
    role: Role.Admin
  };
  await (app as any).factory.create('user', userModel);
  return userModel;
}

describe('test/app/controller/user.test.ts', () => {
  let userModel;
  let token;
  beforeEach(async () => {
    userModel = await createUserModelToDB();
    token = generateToken(userModel.role);
  });
  it('查询单个用户 findOne', async () => {
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

  it('修改用户密码', async () => {
    const newPassword = 'abcde12345678';
    const confirmPassword = 'abcde12345678';

    // when
    const result = await app
      .httpRequest()
      .patch(`/users/${userModel.id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .send({
        newPassword,
        confirmPassword
      });

    // then
    assert(result.body.msg === '修改成功');

    const signinResult = await app
      .httpRequest()
      .post(SIGNIN)
      .send({
        username: userModel.username,
        password: newPassword
      });

    assert(signinResult.body.code === 1);
    assert(signinResult.body.msg === '登录成功');
    assert(signinResult.body.data);
  });

  it('修改用户昵称', async () => {
    // given
    const nickname = '春去春又来';
    // when
    const result = await app
      .httpRequest()
      .patch(`/users/${userModel.id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .send({
        nickname
      });

    // then
    const userVo = result.body.data;
    assert(result.body.msg === '修改成功');
    assert(userVo.nickname === nickname);
  });
  it.skip('修改用户头像');
  it.skip('开通管理员');
});
