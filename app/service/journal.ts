import { Service } from 'egg';
import { v4 as uuidv4 } from 'uuid';

interface JournalSuccessResData {
  id: string; // 返回日志id
  start: number;
  stop: number;
  watch_name: string;
  user_id: string;
}

export default class JouralService extends Service {
  /**
   * 获取观看记录（教程/文章/视频）
   * @param id
   * @param type
   * @param start
   * @param stop
   * @param limit
   * @param offset
   */
  public async getJournal(id, type, start, stop, limit, offset) {
    const resData = await this.app.model.Journal.findAll({ where: { watch_id: id }, type, start, stop }, limit, offset);
    return resData;
  }
  /**
   * 根据用户获取观看记录（教程/文章/视频）
   * @param user_id
   * @param type
   * @param start
   * @param stop
   * @param limit
   * @param offset
   */
  public async getuJournal(user_id, type, start, stop, limit, offset) {
    const resData = await this.app.model.Journal.findAll({ where: user_id, type, start, stop }, limit, offset);
    return resData;
  }
  /**
   * 添加观看记录（教程/文章/视频）
   * @param id
   * @param user_id
   * @param type
   * @param start
   * @param stop
   */
  public async addJournal(id, user_id, start, stop, type): Promise<JournalSuccessResData> {
    // 添加观看记录
    const resData = await this.getData(id, type);
    if (!resData) {
      this.ctx.throw(400, '此 （教程/文章/视频） 已不存在');
    }
    // if (!this.verifyUser(user_id)) {
    //   this.ctx.throw('携带用户标识错误，禁止访问')
    // }
    const result = await this.app.model.Journal.create({
      id: uuidv4(),
      user_id,
      start,
      stop,
      type,
      watch_id: resData.id
    });
    return { ...result.toJSON(), watch_name: resData.name };
  }
  // private verifyUser(user_id) {
  //   const { ctx } = this;
  //   const token = ctx.request.header.authorization;
  //   //token  = {user_id,role}
  //   if (!token) {
  //     ctx.throw('未携带用户标识，禁止访问')
  //   }
  //   return JSON.parse(token).user_id === user_id
  // }
  private async getData(id: any, type: any) {
    let resData;
    if (type === 1) {
      // 教程 查数据库表
      resData = await this.findOneWith(this.app.model.Course, id);
    } else if (type === 2) {
      // 文章 查数据库表
      resData = await this.findOneWith(this.app.model.Article, id);
    } else if (type === 3) {
      // 视频 查数据库表
      resData = await this.findOneWith(this.app.model.Video, id);
    }
    return resData;
  }
  private async findOneWith(model, id) {
    const courseModel = await model.findOne({ where: { id } });
    return courseModel.toJSON();
  }
}
