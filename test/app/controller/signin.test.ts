// 登录接口返回的数据里面要有 token 字段
// 调用登录接口返回的 token ，解出来 ，然后看看里面有没有id之类的字段
// 看看能不能获取到过期时间，如果没有的话 ，那么在 service 里面测试生成过期时间的逻辑

import * as assert from 'assert';
import { app, mock } from 'egg-mock/bootstrap';
import { SIGNIN } from '../../../app/const/index';

function createSigninInfo(info = {}) {
  const defaultInfo = {
    username: 'cxr12345',
    password: '1234567890'
  };

  return Object.assign({}, defaultInfo, info);
}

describe('test/app/controller/signin.test.ts', () => {
  afterEach(mock.restore);
  describe('signin 登录', () => {
    const apiName = SIGNIN;
    describe('username', () => {
      it('当用户名长度为空时，返回用户名不能为空的消息', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createSigninInfo({ username: '' }));

        assert(result.body.code === 0);
        assert(result.body.msg === '账号不能为空');
      });

      it('如果用户名不存在的话，返回用户名不存在的消息', async () => {
        app.mockService('user', 'checkUsernameIsExist', () => {
          return false;
        });

        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createSigninInfo());

        assert(result.body.code === 0);
        assert(result.body.msg === '用户名不存在');
      });
    });

    describe('password', () => {
      it('如果密码为空的话,返回密码不能为空的消息', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createSigninInfo({ password: '' }));

        assert(result.body.code === 0);
        assert(result.body.msg === '密码不能为空');
      });

      it('如果密码错误,返回账号或者密码错误的消息', async () => {
        app.mockService('user', 'checkUsernameIsExist', () => {
          return true;
        });
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createSigninInfo({ password: '1234567890a' }));

        assert(result.body.code === 0);
        assert(result.body.msg === '账号或者密码错误');
      });
    });

    it('如果账号和密码正确,登录成功', async () => {
      app.mockService('user', 'isMatch', () => {
        return true;
      });

      app.mockService('user', 'checkUsernameIsExist', () => {
        return true;
      });

      app.mockService('signin', 'index', () => {
        return {
          id: '1',
          avatar: 'test',
          username: '123123',
          nickname: '12312',
          token: '12333'
        };
      });

      const result = await app
        .httpRequest()
        .post(apiName)
        .send(createSigninInfo({ password: '1234567890' }));

      assert(result.body.code === 1);

      const { body } = result;
      assert(body.code === 1);
      assert(body.data.username);
      assert(body.data.id);
      assert(body.data.nickname);
      assert(body.data.avatar);
      assert(body.data.token);
      assert(result.body.msg === '登录成功');
    });
  });
});
