import { Service } from 'egg';
import * as bcrypt from '../utils/bcrypt';

interface TokenOptions {
  longTimeSignin?: boolean;
  uId: string;
}

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
    const token = this.generateToken({ uId: userModel.id, longTimeSignin });
    return {
      token,
      id: userModel.id,
      avatar: userModel.avatar,
      username: userModel.username,
      nickname: userModel.nickname
    };
  }

  private async checkAccount(username: any, password: any) {
    const isExistUser = await this.ctx.service.user.checkUsernameIsExist(username);
    if (!isExistUser) {
      throw new Error('用户不存在');
    }
    const isMatch = await this.isMatch(username, password);
    if (!isMatch) {
      throw new Error('账号或者密码错误');
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

  private generateToken(options: TokenOptions) {
    const expiresIn = options.longTimeSignin ? '30 days' : '2h';
    const token = this.app.jwt.sign({ uId: options.uId }, this.app.config.jwt.secret, {
      expiresIn
    });
    return token;
  }
}
