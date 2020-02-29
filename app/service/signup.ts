import { Service } from 'egg';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from '../utils/bcrypt';

interface UserModel {
  id: string;
  username: string;
  password: string;
  nickname: string;
  avatar: string;
}

interface UserInfo {
  username: string;
  password: string;
}
export default class SignupService extends Service {
  public async index(userInfo: UserInfo) {
    const result = await this.ctx.model.User.create(this.generateUserModel(userInfo));
    return result.toJSON();
  }

  private generateUserModel({ username, password }: UserInfo): UserModel {
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

  public async checkUsernameIsExist(username) {
    const isExist = await this.ctx.model.User.findOne({ where: { username } });
    if (isExist === null) {
      return false;
    }
    return true;
  }
}
