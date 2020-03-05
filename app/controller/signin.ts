import BaseController from '../core/BaseController';

/**
 * @Controller
 */
export default class SigninController extends BaseController {
  public async index() {
    const { username, password, longTimeSignin } = this.ctx.request.body;
    if (!username) {
      this.fail({
        msg: '账号不能为空'
      });
      return;
    }

    if (!password) {
      this.fail({
        msg: '密码不能为空'
      });
      return;
    }

    const isExistUsername = await this.ctx.service.user.checkUsernameIsExist(username);
    if (!isExistUsername) {
      this.fail({
        msg: '用户名不存在'
      });
      return;
    }

    const isMatch = await this.ctx.service.user.isMatch({ username, password });

    if (!isMatch) {
      this.fail({ msg: '账号或者密码错误' });
      return;
    }

    const resData = await this.ctx.service.signin.index(username, longTimeSignin);
    this.success({
      msg: '登录成功',
      data: resData
    });
  }
}
