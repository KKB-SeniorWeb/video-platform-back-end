// import * as assert from 'assert';
// import { app } from 'egg-mock/bootstrap';
// import { SIGNIN } from '../../../app/const/index';
//
// function createSigninInfo(info = {}) {
//   const defaultInfo = {
//     username: 'cxr12345',
//     password: '1234567890'
//   };
//
//   return Object.assign({}, defaultInfo, info);
// }
//
// describe('test/app/controller/signin.test.ts', () => {
//   describe('signin 登录', () => {
//     const apiName = SIGNIN;
//     describe('username', () => {
//       it('当用户名长度为空时，返回用户名不能为空的消息', async () => {
//         const result = await app
//           .httpRequest()
//           .post(apiName)
//           .send(createSigninInfo({ username: '' }));
//
//         assert(result.body.code === 0);
//       });
//     });
//
//     describe('password', () => {
//       it('如果密码为空的话,返回密码不能为空的消息', async () => {
//         const result = await app
//           .httpRequest()
//           .post(apiName)
//           .send(createSigninInfo({ password: '' }));
//
//         assert(result.body.code === 0);
//       });
//     });
//
//     it('登录成功', async () => {
//       app.mockService('signin', 'index', () => {
//         return true;
//       });
//
//       const result = await app
//         .httpRequest()
//         .post(apiName)
//         .send(createSigninInfo());
//
//       assert(result.body.code === 1);
//       assert(result.body.msg === '登录成功');
//       assert(result.body.data === true);
//     });
//   });
// });
