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

  setResponseData(resData: ResponseData) {
    (this as any).ctx.body = resData;
  }
};
