import BaseController from '../core/BaseController';

/**
 * @Controller
 */
export default class SignupController extends BaseController {
  /**
   * @Summary 注册
   * @Router POST /signup
   * @Request body signupRequest *body
   * @Response 200 signupResponse success
   */
  public async index() {
    try {
      this.validateParams();
      const { password, username } = this.ctx.request.body;
      await this.ctx.service.signup.create({ username, password });
      const resData = await this.ctx.service.signin.index(username, password);
      this.success({ data: resData });
    } catch (e) {
      this.fail({ msg: e.message });
    }
  }

  /**
   * @Summary 检测是否可注册
   * @Router POST /signup_check
   * @Request body signupRequest *body
   * @Response 200 baseResponseSuccess success
   */
  public async check() {
    try {
      this.validateParams();
      const { username } = this.ctx.request.body;
      await this.ctx.service.signup.check(username);
      this.success({
        msg: '可注册'
      });
    } catch (e) {
      this.fail({ msg: e.message });
    }
  }

  private validateParams() {
    this.ctx.validate(this.getRule());
    this.validateConfirmPassword();
  }

  private validateConfirmPassword() {
    const { confirmPassword, password } = this.ctx.request.body;
    if (confirmPassword !== password) {
      throw new Error('密码和确认密码不一致');
    }
  }

  private getRule() {
    return {
      username: {
        type: 'string',
        format: /^(?!\d)[\u4e00-\u9fa5_a-zA-Z0-9]{6,12}$/
      },
      password: {
        type: 'string',
        format: /^[_a-zA-Z0-9]{8,22}$/
      }
    };
  }
}
