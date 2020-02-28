import * as assert from 'assert';
import { app, mock } from 'egg-mock/bootstrap';

function assertFail(res) {
  assert(res.status === 403);
  assert(res.body.code === 0);
  assert(res.body.msg);
}

function assertSuccess(res) {
  assert(res.status === 200);

  // 检查返回值字段
  const { body } = res;
  assert(body.code === 1);
  assert(body.data.username);
  assert(body.data.id);
  assert(body.data.nickname);
  assert(body.data.avatar);
}

function createSignupInfo(info = {}) {
  const defaultInfo = {
    username: 'chunqu',
    password: '123456789',
    confirmPassword: '123456789'
  };
  return Object.assign({}, defaultInfo, info);
}

function createPasswordSignupInfo(password) {
  return createSignupInfo({
    password,
    confirmPassword: password
  });
}
describe('test/app/controller/signup.test.ts', () => {
  beforeEach(() => {
    app.mockService('signup', 'checkUsernameIsExist', () => {
      return false;
    });
  });

  afterEach(mock.restore);

  describe('signUp 注册', () => {
    const apiName = '/signup';
    describe('username', () => {
      it('当用户名长度为空时，校验失败', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createSignupInfo({ username: '' }));
        assertFail(result);
      });

      it('当用户名长度大于 12 时，会校验失败', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createSignupInfo({ username: '0123456789abc' }));

        assertFail(result);
      });

      it('当用户名长度小于等于 12 并且大于等于 6 时，会校验成功', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createSignupInfo({ username: 'abcdefghigkl' }));

        assertSuccess(result);
      });

      it('当用户名长度小于 6 时，会校验失败', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createSignupInfo({ username: 'abcde' }));

        assertFail(result);
      });

      it('当用户名数字开头的话，会校验失败', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createSignupInfo({ username: '1abcdef' }));

        assertFail(result);
      });

      it('当用户名出现除了数字中文和_之外的字符，会校验失败', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createSignupInfo({ username: 'ab~cdef' }));
        assertFail(result);
      });
    });

    describe('password', () => {
      it('当密码为空时，会校验失败 ', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createPasswordSignupInfo(''));
        assertFail(result);
      });

      it('当密码的长度为 8 - 22 只包含英文字符数字和_, 会校验成功', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createPasswordSignupInfo('12345678a_'));
        assertSuccess(result);
      });

      it('当包含特殊字符 ~, 会校验失败', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createPasswordSignupInfo('1234567~8a_'));
        assertFail(result);
      });
      it('当密码长度小于 8 时, 会校验失败', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createPasswordSignupInfo('1234567'));
        assertFail(result);
      });
      it('当密码长度大于 22 时, 会校验失败', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createPasswordSignupInfo('1234567890qwertyuiopasdf'));
        assertFail(result);
      });
      it('当密码长度大于 8 小于 22 除_以外没有出现任何特殊字符时, 会校验成功', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createPasswordSignupInfo('123456789abckdieowlds'));
        assertSuccess(result);
      });
    });

    describe('confirmPassword', () => {
      it('和 password 一样，验证成功', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createSignupInfo({ password: '123456789', confirmPassword: '123456789' }));
        assertSuccess(result);
      });
      it('和 password 不一样，验证失败', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createSignupInfo({ password: '123456789', confirmPassword: '1234567891' }));
        assertFail(result);
      });
    });

    it('如果用户已经存在，那么注册失败', async () => {
      app.mockService('signup', 'checkUsernameIsExist', () => {
        return true;
      });

      const result = await app
        .httpRequest()
        .post(apiName)
        .send(createSignupInfo());
      assertFail(result);
    });
    it('如果用户不存在，那么注册成功', async () => {
      const result = await app
        .httpRequest()
        .post(apiName)
        .send(createSignupInfo());
      assertSuccess(result);
    });
  });
});
