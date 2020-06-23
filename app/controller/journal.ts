import BaseController from '../core/BaseController';

/**
 * @Controller
 */
export function getType(that) {
  const { type } = that.ctx.params;
  if (type === 'course') {
    return 1;
  } else if (type === 'article') {
    return 2;
  } else if (type === 'video') {
    return 3;
  }
}
export default class JournalController extends BaseController {
  /**
   * @Summary 添加教程观看记录
   * @Router POST /journal/add/course
   * @Request body journalAddRequest *body
   * @Response 200 journalAddResponse success
   */
  /**
   * @Summary 添加视频观看记录
   * @Router POST /journal/add/video
   * @Request body journalAddRequest *body
   * @Response 200 journalAddResponse success
   */
  /**
   * @Summary 添加文章观看记录
   * @Router POST /journal/add/article
   * @Request body journalAddRequest *body
   * @Response 200 journalAddResponse success
   */
  public async add() {
    const { id, userId, start, stop } = this.ctx.request.body;
    this.ctx.validate(this.addRule());
    const type = await getType(this);
    const result = await this.ctx.service.journal.add(id, type, userId, start, stop);
    this.success({
      code: 1,
      msg: '添加观看记录成功',
      data: result
    });
  }
  /**
   * @Summary 查询教程观看记录
   * @Router GET /journal/id/course
   * @Request body journalGetByIdRequest *body
   * @Response 200 journalGetByIdResponse success
   */
  /**
   * @Summary 查询视频观看记录
   * @Router GET /journal/id/video
   * @Request body journalGetByIdRequest *body
   * @Response 200 journalGetByIdResponse success
   */
  /**
   * @Summary 查询文章观看记录
   * @Router GET /journal/id/article
   * @Request body journalGetByIdRequest *body
   * @Response 200 journalGetByIdResponse success
   */
  public async getById() {
    const { id, limit, offset } = this.ctx.request.body;
    this.ctx.validate(this.getRule('id'));
    const type = await getType(this);
    const result = await this.ctx.service.journal.getById(id, type, limit, offset);
    this.success({
      code: 1,
      msg: '获取观看记录成功',
      data: result
    });
  }
  /**
   * @Summary 查询用户的教程观看记录
   * @Router GET /journal/user/course
   * @Request body journalGetByUserRequest *body
   * @Response 200 journalGetByUserResponse success
   */
  /**
   * @Summary 查询用户的获取视频观看记录
   * @Router GET /journal/user/video
   * @Request body journalGetByUserRequest *body
   * @Response 200 journalGetByUserResponse success
   */
  /**
   * @Summary 查询用户的获取文章观看记录
   * @Router GET /journal/user/article
   * @Request body journalGetByUserRequest *body
   * @Response 200 journalGetByUserResponse success
   */
  public async getByUser() {
    const { userId, limit, offset } = this.ctx.request.body;
    this.ctx.validate(this.getRule('userId'));
    const type = await getType(this);
    const result = await this.ctx.service.journal.getByUser(userId, type, limit, offset);
    this.success({
      code: 1,
      msg: '获取观看记录成功',
      data: result
    });
  }
  private getRule(arg) {
    const rule = {};
    rule[arg] = {
      type: 'string',
      required: true
    };
    return rule;
  }
  private addRule() {
    return {
      id: {
        type: 'string',
        required: true
      },
      userId: {
        type: 'string',
        required: true
      }
    };
  }
}
