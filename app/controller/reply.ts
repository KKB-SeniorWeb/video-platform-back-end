import BaseController from '../core/BaseController';
import { getType } from './journal';

/**
 * @Controller
 */
export default class ReplyController extends BaseController {
  /**
   * @Summary 发表视频评论
   * @Router POST /reply/push/video
   * @Request body replyPushRequest *body
   * @Response 200 replyPushResponse success
   */
  /**
   * @Summary 发表文章评论
   * @Router POST /reply/push/article
   * @Request body replyPushRequest *body
   * @Response 200 replyPushResponse success
   */
  public async push() {
    const { userId, watchId, reply } = this.ctx.request.body;
    this.ctx.validate(this.pushRule());
    const type = await getType(this);
    await this.ctx.service.reply.push(type, userId, watchId, reply);
    this.success({
      code: 1,
      msg: '发表评论成功'
    });
  }
  /**
   * @Summary 获取单个评论
   * @Router GET /reply/get
   * @Request body replyGetRequest *body
   * @Response 200 replyGetResponse success
   */
  public async get() {
    const { id } = this.ctx.query;
    this.ctx.validate(this.rule(), this.ctx.query);
    const result = await this.ctx.service.reply.get(id);
    this.success({
      code: 1,
      msg: '获取评论成功',
      data: result
    });
  }
  /**
   * @Summary 获取文章评论列表
   * @Router GET /reply/get/list/article
   * @Request body replyGetListRequest *body
   * @Response 200 replyGetListResponse success
   */
  /**
   * @Summary 获取视频评论列表
   * @Router GET /reply/get/list/video
   * @Request body replyGetListRequest *body
   * @Response 200 replyGetListResponse success
   */
  public async getList() {
    const { id, offset, limit } = this.ctx.query;
    this.ctx.validate(this.rule(), this.ctx.query);
    const type = await getType(this);
    const result = await this.ctx.service.reply.getList(id, type, offset, limit);
    this.success({
      code: 1,
      msg: '获取评论列表成功',
      data: result
    });
  }
  private rule() {
    return {
      id: {
        type: 'string',
        required: true
      }
    };
  }
  private pushRule() {
    return {
      userId: {
        type: 'string',
        required: true
      },
      watchId: {
        type: 'string',
        required: true
      },
      reply: {
        type: 'string',
        required: true
      }
    };
  }
}
