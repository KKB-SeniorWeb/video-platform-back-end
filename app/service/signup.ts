import { Service } from 'egg';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from '../utils/bcrypt';
import { Account } from './user';

interface UserModel {
  id: string;
  username: string;
  password: string;
  nickname: string;
  avatar: string;
}

export default class SignupService extends Service {
  /**
   * 注册用户
   * 创建一个用户
   * @param account
   */
  public async create(account: Account) {
    await this.check(account.username);
    const userRawModel = await this.ctx.model.User.create(this.generateUserModel(account));
    return userRawModel.toJSON();
  }

  /**
   * 检查用户是否可注册
   * @param username
   */
  public async check(username) {
    const isExist = await this.ctx.service.user.checkUsernameIsExist(username);
    if (isExist) {
      throw new Error('用户名已经存在');
    }
  }

  private generateUserModel({ username, password }: Account): UserModel {
    return {
      id: uuidv4(),
      username,
      password: bcrypt.hashSync(password),
      nickname: this.getNickname(),
      avatar: 'test'
    };
  }

  private getNickname() {
    return new Date().valueOf() + '_name';
  }
}
