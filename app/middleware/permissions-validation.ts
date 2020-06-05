// eslint-disable-next-line @typescript-eslint/no-var-requires
const assert = require('assert');
function getToken(authorization) {
  const token = authorization.split(' ')[1];
  assert(token, 'jwt 格式有问题 应该为 [type token] 格式');
  return token;
}
function getUserRole(ctx) {
  const authorization = ctx.get('Authorization');
  const secretKey = ctx.app.config.jwt.secret;
  const { role } = ctx.app.jwt.verify(getToken(authorization), secretKey);
  return role;
}

// 必须在 jwt 之后调用这个中间件
module.exports = (roles: string[]) => {
  return async function permissionsValidation(ctx, next) {
    // 不能修改完数据库就实时生效
    // 必须让用户重新登录，重新发 token 后
    // 修改之后的 role 才能生效
    const role = getUserRole(ctx);
    const canVisit = roles.includes(role);
    if (canVisit) {
      return next();
    }
    ctx.throw(401, '没有权限访问');
  };
};
