import { Service } from 'egg';

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
    return Boolean(isExist);
  }
}
