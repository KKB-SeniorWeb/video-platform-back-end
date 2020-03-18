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

  public async findOne(uId: string) {
    this.checkPermissions(uId);
    const userInfo = await this.ctx.model.User.findOne({ where: { id: uId } });
    return userInfo.toJSON();
  }

  private checkPermissions(findUId) {
    const { uId: currentUId, role } = this.ctx.service.jwt.getTokenInfo();

    if (role === 'user' && currentUId !== findUId) {
      this.ctx.throw(401, '没有权限');
    }
  }
}
