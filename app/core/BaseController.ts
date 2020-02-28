import { Controller } from 'egg';

export default class BaseController extends Controller {
  protected success(data: {}, msg = '') {
    this.ctx.status = 200;
    this.ctx.body = {
      msg,
      data,
      code: 1
    };
  }

  protected fail(data: {}, msg = '') {
    this.ctx.status = 403;
    this.ctx.body = {
      msg,
      data,
      code: 0
    };
  }
}
