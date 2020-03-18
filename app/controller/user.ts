import BaseController from '../core/BaseController';

interface UserVO {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
}

/**
 * @Controller
 */
export default class UserController extends BaseController {
  /**
   * @Summary 获取单个用户信息
   */
  public async findOne() {
    const { id } = this.ctx.params;
    const result = await this.ctx.service.user.findOne(id);
    const userVO = this.toUserVO(result);
    this.success({ data: userVO });
  }

  // 这里的 any 应该换成 userBO
  private toUserVO(data: any): UserVO {
    return {
      id: data.id,
      username: data.username,
      nickname: data.nickname,
      avatar: data.avatar
    };
  }
}
