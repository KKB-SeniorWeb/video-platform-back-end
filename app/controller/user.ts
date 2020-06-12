import BaseController from '../core/BaseController';

export class UserVo {
  public id: string;
  public username: string;
  public nickname: string;
  public avatar: string;

  public constructor({ id, username, nickname, avatar }) {
    this.id = id;
    this.username = username;
    this.nickname = nickname;
    this.avatar = avatar;
  }

  public toJSON() {
    return {
      id: this.id,
      username: this.username,
      nickname: this.nickname,
      avatar: this.avatar
    };
  }
}

/**
 * @Controller
 */
export default class UserController extends BaseController {
  /**
   * @Summary 查询单个用户
   */
  public async findOne() {
    const { id } = this.ctx.params;
    const userEntity = await this.ctx.service.user.findOne(id);
    this.success({
      data: new UserVo(userEntity)
    });
  }

  /**
   * @Summary 查询用户列表
   */
  public async findAll() {
    const { page = 1, limit = 10 } = this.ctx.query;
    const userEntitys = await this.ctx.service.user.findAll(+page, +limit);
    const userLen = await this.ctx.service.user.getUserTotalNumber();
    const userVoList = userEntitys.map(entity => new UserVo(entity));
    this.success({
      data: {
        data: userVoList,
        userLen
      }
    });
  }

  public async deleteUser() {
    const { id } = this.ctx.params;
    const result = await this.ctx.service.user.deleteUser(id);
    this.success({
      data: result
    });
  }

  public async update() {
    const { newPassword } = this.ctx.request.body;

    if (newPassword) {
      await this.changePassword();
    }
  }

  private async changePassword() {
    const { newPassword, confirmPassword } = this.ctx.request.body;
    const { id } = this.ctx.params;

    this.ctx.validate({
      newPassword: {
        required: true,
        type: 'string',
        format: /^[_a-zA-Z0-9]{8,22}$/
      },
      confirmPassword: {
        required: true,
        type: 'string'
      }
    });

    await this.ctx.service.user.changePassword({
      id,
      newPassword,
      confirmPassword
    });

    this.success({
      msg: 'Change the password successfully'
    });
  }
}
