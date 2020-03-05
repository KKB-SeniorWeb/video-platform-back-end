import { Service } from 'egg';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from '../utils/bcrypt';
import { AccountInterface } from './user';

interface UserModel {
  id: string;
  username: string;
  password: string;
  nickname: string;
  avatar: string;
}

export default class SignupService extends Service {
  public async index(accountInfo: AccountInterface) {
    const userRawModel = await this.ctx.model.User.create(this.generateUserModel(accountInfo));
    return userRawModel.toJSON();
  }

  private generateUserModel({ username, password }: AccountInterface): UserModel {
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
