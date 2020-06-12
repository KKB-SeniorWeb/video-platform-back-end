import BaseController from '../core/BaseController';

/**
 * @Controller
 */
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
    const resData = await this.ctx.service.journal.add(id, this.getType(), userId, start, stop);
    this.success({
      code: 1,
      msg: '添加观看记录成功',
      data: resData
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
    console.log('============', this.ctx.params);
    const { id, limit, offset } = this.ctx.request.body;
    this.ctx.validate(this.getRule('id'));
    const resData = await this.ctx.service.journal.getById(id, this.getType(), limit, offset);
    this.success({
      code: 1,
      msg: '获取观看记录成功',
      data: resData
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
    const resData = await this.ctx.service.journal.getByUser(userId, this.getType(), limit, offset);
    this.success({
      code: 1,
      msg: '获取观看记录成功',
      data: resData
    });
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

  private getRule(arg) {
    const rule = {
      type: {
        type: 'number',
        required: true
      }
    };
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
