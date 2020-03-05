import { Service } from 'egg';
import * as bcrypt from '../utils/bcrypt';

export interface Account {
  username: string;
  password: string;
}

export default class UserService extends Service {
  /**
   * 检测用户是否存在
   * @param username
   */
  public async checkUsernameIsExist(username: string) {
    const isExist = await this.ctx.model.User.findOne({ where: { username } });
    if (isExist === null) {
      return false;
    }
    return true;
  }

  /**
   * 账号和密码是否匹配
   * @param
   */
  public async isMatch({ username, password }: Account) {
    const userModel = await this.ctx.model.User.findOne({ where: { username } });
    if (!userModel) return false;
    return bcrypt.compareSync(password, userModel.password);
  }
}
