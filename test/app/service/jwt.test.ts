// import * as assert from 'assert';
// import { Context } from 'egg';
// import { app } from 'egg-mock/bootstrap';
//
// function generateToken(uId: string) {
//   const token = app.jwt.sign({ uId }, app.config.jwt.secret);
//   return token;
// }
// describe('service/jwt.test.js', () => {
//   let ctx: Context;
//   before(async () => {
//     ctx = app.mockContext();
//   });
//
//   it('获取当前 token 的信息', () => {
//     const uId = '123456';
//     const token = generateToken(uId);
//     ctx.header.authorization = 'Bearer ' + token;
//     const info: any = ctx.service.jwt.getTokenInfo();
//     assert(info.uId === uId);
//   });
// });
