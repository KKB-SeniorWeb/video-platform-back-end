import { Service } from 'egg';
import { v4 as uuidv4 } from 'uuid';

export default class ReplyService extends Service {
  /**
   * 发表视频评论
   * @param userId
   * @param watchId
   * @param reply
   */
  /**
   * 发表文章评论
   * @param type
   * @param userId
   * @param watchId
   * @param reply
   */
  public async push(type, userId, watchId, reply) {
    const resData = await this.getData(watchId, type);
    if (!resData) {
      this.ctx.throw(400, '此 （文章/视频） 已不存在');
    }
    const result = await this.app.model.Reply.create({
      id: uuidv4(),
      type,
      user_id: userId,
      watch_id: watchId,
      reply
    });
    return { ...result.toJSON() };
  }
  /**
   * 获取单个评论
   * @param id
   */
  public async get(id) {
    const resData = await this.findOneWith(this.app.model.Reply, id);
    const userId = await resData.user_id;
    const user = await this.findOneWith(this.app.model.User, userId);
    const type = await resData.type;
    let watch;
    if (type === 2) {
      watch = await this.findOneWith(this.app.model.Article, resData.watch_id);
    } else if (type === 3) {
      watch = await this.findOneWith(this.app.model.Video, resData.watch_id);
    }
    return { user, watch, resData };
  }
  /**
   * 获取文章评论列表
   * @param id
   * @param offset
   * @param limit
   */
  /**
   * 获取视频评论列表
   * @param id
   * @param type
   * @param offset
   * @param limit
   */
  public async getList(id, type, offset, limit) {
    const resData = await this.getData(id, type);
    const result = await this.app.model.Reply.findAll({
      where: { watch_id: id },
      offset,
      limit
    });
    let userId;
    if (type === 2) {
      userId = await resData.author_id;
    } else if (type === 3) {
      userId = await resData.user_id;
    }
    const user = await this.findOneWith(this.app.model.User, userId);
    return { watch: resData, user, reply: result };
  }
  private async getData(id: any, type: any) {
    let resData;
    if (type === 2) {
      resData = await this.findOneWith(this.app.model.Article, id);
    } else if (type === 3) {
      resData = await this.findOneWith(this.app.model.Video, id);
    }
    return resData;
  }
  private async findOneWith(model, id) {
    const Model = await model.findOne({ where: { id } });
    return Model ? Model.toJSON() : Model;
  }
}
