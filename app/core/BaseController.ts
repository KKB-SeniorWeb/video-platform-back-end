import { Controller } from 'egg';

interface ResponseData {
  msg?: string;
  code?: number;
  data?: object;
}

export default class BaseController extends Controller {
  protected success({ data = {}, code = 1, msg = 'success' }: ResponseData) {
    this.setCtxBody({ data, code, msg });
  }

  protected fail({ data = {}, code = 0, msg = 'fail' }: ResponseData) {
    this.setCtxBody({ data, code, msg });
  }

  private setCtxBody(resData: ResponseData) {
    this.ctx.body = resData;
  }
}
