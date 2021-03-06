import BaseController from '../core/BaseController';

/**
 * @Controller
 */

/**
 * @Summary 登录
 * @Router POST /signin
 * @Request body signinRequest *body
 * @Response 200 signinResponse success
 */
export default class SigninController extends BaseController {
  public async index() {
    const { username, password, longTimeSignin } = this.ctx.request.body;
    this.ctx.validate(this.getRule());
    const resData = await this.ctx.service.signin.index(username, password, longTimeSignin);
    this.success({
      msg: '登录成功',
      data: resData
    });
  }

  private getRule() {
    return {
      username: {
        required: true,
        type: 'string'
      },
      password: {
        required: true,
        type: 'string'
      }
    };
  }
}
