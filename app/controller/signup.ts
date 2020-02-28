import BaseController from '../core/BaseController';

function getSignUpRule() {
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
function validateConfirmPassword(ctx) {
  const { confirmPassword, password } = ctx.request.body;
  if (confirmPassword !== password) {
    throw new Error('密码和确认密码不一致');
  }
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
   * @Response 403 baseResponseFail fail
   */
  public async index() {
    const { ctx } = this;

    const validateSwitch = true;
    if (validateSwitch) {
      try {
        ctx.validate(getSignUpRule());
        validateConfirmPassword(ctx);
      } catch (e) {
        this.fail('', e.message);
        return;
      }
    }

    const { username } = ctx.request.body;
    const isExist = await this.ctx.service.signup.checkUsernameIsExist(username);
    if (isExist) {
      this.fail('', '用户名已经存在');
      return;
    }

    const { password } = ctx.request.body;
    const result = await this.ctx.service.signup.index(username, password);

    // 组装数据
    const resData = {
      username: result.username,
      id: result.id,
      nickname: result.nickname,
      avatar: result.avatar
    };

    this.success(resData);
  }
}
