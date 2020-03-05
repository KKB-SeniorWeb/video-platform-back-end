import { Service } from 'egg';

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
  public async index(username, longTimeSignin = false): Promise<SigninSuccessResData> {
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
