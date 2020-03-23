import { Controller } from 'egg';

export default class BaseController extends Controller {
  protected success(param) {
    this.ctx.helper.success(param);
  }

  protected fail(param) {
    this.ctx.helper.fail(param);
  }
}
