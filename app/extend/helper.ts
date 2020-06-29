interface ResponseData {
  msg?: string;
  code?: number;
  data?: object | boolean;
}

export default {
  success({ data = {}, code = 1, msg = 'success' }: ResponseData) {
    this.setResponseData({ data, code, msg });
  },

  fail({ data = {}, code = 0, msg = 'fail' }: ResponseData) {
    this.setResponseData({ data, code, msg });
  },

  setResponseData(this: any, resData: ResponseData) {
    this.ctx.body = resData;
  }
};
