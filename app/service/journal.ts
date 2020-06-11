import { Service } from 'egg';
import { v4 as uuidv4 } from 'uuid';

interface JournalSuccessResData {
  id: string;
  start: number;
  stop: number;
  watch_name: string;
  userId: string;
}

export default class JouralService extends Service {
  /**
   * 获取观看记录（教程/文章/视频）
   * @param id
   * @param limit
   * @param offset
   */
  //
  public async getById(id, limit, offset) {
    const resData = await this.app.model.Journal.findAll({
      where: { watch_id: id, type: this.getType() },
      limit,
      offset
    });
    return resData;
  }
  /**
   * 根据用户获取观看记录（教程/文章/视频）
   * @param userId
   * @param limit
   * @param offset
   */
  public async getByUser(userId, limit, offset) {
    const resData = await this.app.model.Journal.findAll({
      where: {
        user_id: userId,
        type: this.getType()
      },
      limit,
      offset
    });

    return resData;
  }
  /**
   * 添加观看记录（教程/文章/视频）
   * @param id
   * @param userId
   * @param start
   * @param stop
   */
  public async add(id, userId, start, stop): Promise<JournalSuccessResData> {
    const resData = await this.getData(id, this.getType());
    if (!resData) {
      this.ctx.throw(400, '此 （教程/文章/视频） 已不存在');
    }
    const result = await this.app.model.Journal.create({
      id: uuidv4(),
      user_id: userId,
      start,
      stop,
      type: this.getType(),
      watch_id: resData.id
    });
    return { ...result.toJSON(), watch_name: resData.name };
  }
  private async getType() {
    const { type } = this.ctx.params;
    if (type === 'course') {
      return 1;
    } else if (type === 'video') {
      return 2;
    } else if (type === 'article') {
      return 3;
    }
  }
  private async getData(id: any, type: any) {
    let resData;
    if (type === 1) {
      resData = await this.findOneWith(this.app.model.Course, id);
    } else if (type === 2) {
      resData = await this.findOneWith(this.app.model.Article, id);
    } else if (type === 3) {
      resData = await this.findOneWith(this.app.model.Video, id);
    }
    return resData;
  }
  private async findOneWith(model, id) {
    const courseModel = await model.findOne({ where: { id } });
    return courseModel.toJSON();
  }
}
