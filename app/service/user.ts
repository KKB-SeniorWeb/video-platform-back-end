import * as bcrypt from '../utils/bcrypt';
import { Service } from 'egg';

export interface Account {
  username: string;
  password: string;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
  Master = 'master'
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
    this.checkFindOnePermissions(uId);
    const userEntity = await this.ctx.model.User.findOne({ where: { id: uId } });
    return userEntity.toJSON();
  }

  public async findAll(page, limit) {
    const queryOption = this.getFindAllQueryOption(page, limit);
    const userEntityList = await this.ctx.model.User.findAll(queryOption);
    return userEntityList.map(entity => entity.toJSON());
  }

  public async getUserTotalNumber() {
    const userList = await this.ctx.model.User.findAll();
    return userList.length;
  }

  public async deleteUser(id) {
    this.checkDeleteUIdIsSelf(id);
    const result = await this.ctx.model.User.destroy({ where: { id } });
    return Boolean(result);
  }

  private checkChangeRolePermissions() {
    const { role: currentUserRole } = this.ctx.service.jwt.getTokenInfo();
    if (currentUserRole !== Role.Admin) {
      return this.ctx.throw(403, '没有权限');
    }
  }

  public async changeRole({ id, role }) {
    this.checkChangeRolePermissions();
    const [result] = await this.ctx.model.User.update(
      {
        role
      },
      {
        where: {
          id
        }
      }
    );

    if (result === 0) {
      this.ctx.throw(400, '修改失败，角色没有更新');
    }

    return result;
  }

  public async changeNickname({ id, nickname }) {
    this.checkIsSelfUser(id, () => {
      this.ctx.throw(400, '没有权限');
    });

    const [result] = await this.ctx.model.User.update(
      {
        nickname
      },
      {
        where: {
          id
        }
      }
    );

    if (result === 0) {
      this.ctx.throw(400, '修改失败，昵称没有更新');
    }

    return result;
  }

  private checkIsSelfUser(id: any, throwCallback: Function) {
    const { uId: currentUId, role } = this.ctx.service.jwt.getTokenInfo();

    if (this.isUserOfRole(role) && currentUId !== id) {
      throwCallback();
    }
  }

  public async changePassword({ id, newPassword, confirmPassword }) {
    this.checkIsSelfUser(id, () => {
      this.throwNoPermissionError();
    });

    if (newPassword !== confirmPassword) {
      this.ctx.throw(400, '密码和确认密码不一致');
    }

    const [result] = await this.ctx.model.User.update(
      {
        password: bcrypt.hashSync(newPassword)
      },
      {
        where: {
          id
        }
      }
    );

    if (result !== 1) {
      this.ctx.throw(400, '修改密码失败');
    }

    return result;
  }

  private checkDeleteUIdIsSelf(id) {
    const { uId: selfUId } = this.ctx.service.jwt.getTokenInfo();
    if (selfUId === id) {
      this.ctx.throw(400, '不能删除自己');
    }
  }

  private getFindAllQueryOption(page: number, limit: number) {
    const queryOption = {
      limit,
      offset: this.getQueryOffset(page, limit)
    };
    return queryOption;
  }

  private getQueryOffset(page: number, limit: number) {
    return Math.max(0, (page - 1) * limit);
  }

  private checkFindOnePermissions(findUId) {
    const { uId: currentUId, role } = this.ctx.service.jwt.getTokenInfo();
    if (this.isUserOfRole(role) && currentUId !== findUId) {
      this.throwNoPermissionError();
    }
  }

  private isUserOfRole(role) {
    return role === Role.User;
  }

  private throwNoPermissionError() {
    this.ctx.throw(401, '没有权限');
  }
}
