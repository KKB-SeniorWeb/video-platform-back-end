import { Service } from 'egg';
import { v4 as uuidv4 } from 'uuid';

const getNickname = () => {
  return new Date().valueOf() + '_name';
};

export default class SignupService extends Service {
  public async index(username, password) {
    const result = await this.ctx.model.User.create({
      id: uuidv4(),
      username,
      password,
      nickname: getNickname(),
      avatar: 'test'
    });
    return result.toJSON();
  }

  public async checkUsernameIsExist(username) {
    const isExist = await this.ctx.model.User.findOne({ where: { username } });
    if (isExist === null) {
      return false;
    }
    return true;
  }
}
