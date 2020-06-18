/**
 *返回 err 对象的错误数据
 * 返回优先级 err.data > err.errors
 * @param {*} err
 * @return
 */
function getErrorData(err) {
  if (err.data) {
    return err.data;
  }
  if (err.errors) {
    return err.errors;
  }
}
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      // debug useful
      // console.trace(err);
      if (ctx.app.config.env !== 'unittest') ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const errorMsg = status === 500 && ctx.app.config.env === 'prod' ? 'Internal Server Error' : err.message;

      ctx.helper.fail({
        msg: errorMsg,
        data: getErrorData(err)
      });

      ctx.status = status;
    }
  };
};
