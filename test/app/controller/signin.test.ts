// 登录接口返回的数据里面要有 token 字段
// 调用登录接口返回的 token ，解出来 ，然后看看里面有没有id之类的字段
// 看看能不能获取到过期时间，如果没有的话 ，那么在 service 里面测试生成过期时间的逻辑

import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { SIGNIN } from '../../../app/const/index';

function createSigninInfo(info = {}) {
  const defaultInfo = {
    username: 'cxr12345',
    password: '1234567890'
  };

  return Object.assign({}, defaultInfo, info);
}

describe('test/app/controller/signin.test.ts', () => {
  describe('signin 登录', () => {
    const apiName = SIGNIN;
    describe('username', () => {
      it('当用户名长度为空时，返回用户名不能为空的消息', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createSigninInfo({ username: '' }));

        assert(result.body.code === 0);
      });
    });

    describe('password', () => {
      it('如果密码为空的话,返回密码不能为空的消息', async () => {
        const result = await app
          .httpRequest()
          .post(apiName)
          .send(createSigninInfo({ password: '' }));

        assert(result.body.code === 0);
      });
    });

    it('登录成功', async () => {
      app.mockService('signin', 'index', () => {
        return true;
      });

      const result = await app
        .httpRequest()
        .post(apiName)
        .send(createSigninInfo());

      assert(result.body.code === 1);
      assert(result.body.msg === '登录成功');
      assert(result.body.data === true);
    });
  });
});
