import { Controller } from 'egg';

interface ResponseData {
  msg?: string;
  code?: number;
  data?: object;
}

export default class BaseController extends Controller {
  protected success({ data = {}, code = 1, msg = 'success' }: ResponseData) {
    this.ctx.helper.success({ data, code, msg });
  }

  protected fail({ data = {}, code = 0, msg = 'fail' }: ResponseData) {
    this.ctx.helper.fail({ data, code, msg });
  }
}
