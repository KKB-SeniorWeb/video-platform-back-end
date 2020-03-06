import BaseController from '../core/BaseController';

/**
 * @Controller
 */
export default class SigninController extends BaseController {
  public async index() {
    const { username, password, longTimeSignin } = this.ctx.request.body;
    try {
      this.ctx.validate(this.getRule());
      const resData = await this.ctx.service.signin.index(username, password, longTimeSignin);
      this.success({
        msg: '登录成功',
        data: resData
      });
    } catch (e) {
      this.fail({ msg: e.message });
    }
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
