import { Service } from 'egg';
import * as bcrypt from '../utils/bcrypt';

interface SigninSuccessResData {
  id: string;
  token: string;
  avatar: string;
  username: string;
  nickname: string;
}

export default class SigninService extends Service {
  /**
   * 登录
   * @param username
   * @param password
   * @param longTimeSignin
   */
  public async index(username, password, longTimeSignin = false): Promise<SigninSuccessResData> {
    await this.checkAccount(username, password);
    const userModel = await this.getUserModel(username);
    const token = this.generateToken(userModel, longTimeSignin);

    return {
      token,
      id: userModel.id,
      avatar: userModel.avatar,
      username: userModel.username,
      nickname: userModel.nickname
    };
  }

  private generateToken(userModel, longTimeSignin) {
    const { id: uId, role } = userModel;
    const expiresIn = longTimeSignin ? '30 days' : '2h';
    return this.ctx.service.jwt.generateToken({
      expiresIn,
      payload: {
        uId,
        role
      }
    });
  }

  private async checkAccount(username: any, password: any) {
    const isExistUser = await this.ctx.service.user.checkUsernameIsExist(username);
    const errorMsg = '账号或者密码错误';
    const errorStatus = 400;
    if (!isExistUser) {
      this.ctx.throw(errorStatus, errorMsg);
    }
    const isMatch = await this.isMatch(username, password);
    if (!isMatch) {
      this.ctx.throw(errorStatus, errorMsg);
    }
  }

  private async isMatch(username, password) {
    const userModel = await this.ctx.model.User.findOne({ where: { username } });
    if (!userModel) return false;
    return bcrypt.compareSync(password, userModel.password);
  }

  private async getUserModel(username) {
    const userModel = await this.ctx.model.User.findOne({ where: { username } });
    return userModel.toJSON();
  }
}
