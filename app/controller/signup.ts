import BaseController from '../core/BaseController';

interface ValidateResult {
  isPass: boolean;
  msg: string;
}

interface SignupSuccessResData {
  id: string;
  avatar: string;
  username: string;
  nickname: string;
}

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
    const isValidatePass = await this.handleValidate();
    if (isValidatePass) {
      const { password, username } = this.ctx.request.body;
      const result = await this.ctx.service.signup.index(username, password);
      this.success({
        data: this.generateResData(result)
      });
    }
  }

  private generateResData(result): SignupSuccessResData {
    const { id, avatar, username, nickname } = result;
    return {
      id,
      avatar,
      username,
      nickname
    };
  }

  /**
   * @Summary 检测是否可注册
   * @Router POST /signup_check
   * @Request body signupRequest *body
   * @Response 200 baseResponseSuccess success
   */
  public async check() {
    const isValidatePass = await this.handleValidate();
    if (isValidatePass) {
      this.success({
        msg: '校验成功'
      });
    }
  }

  private async handleValidate(): Promise<boolean> {
    const { ctx } = this;

    const validateResult = await this.validateAllFields();
    if (!validateResult.isPass) {
      this.fail({
        msg: validateResult.msg
      });
      return false;
    }

    const { username } = ctx.request.body;
    const isExist = await this.ctx.service.signup.checkUsernameIsExist(username);
    if (isExist) {
      this.fail({
        msg: '用户名已经存在'
      });
      return false;
    }

    return true;
  }

  private async validateAllFields(): Promise<ValidateResult> {
    const validateConfirmPassword = () => {
      const { confirmPassword, password } = this.ctx.request.body;
      if (confirmPassword !== password) {
        throw new Error('密码和确认密码不一致');
      }
    };

    const result: ValidateResult = {
      isPass: true,
      msg: ''
    };

    try {
      this.ctx.validate(this.getSignUpRule());
      validateConfirmPassword();
    } catch (e) {
      result.msg = e.message;
      result.isPass = false;
    }

    return result;
  }

  private getSignUpRule() {
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
