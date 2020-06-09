import BaseController from '../core/BaseController';

/**
 * @Controller
 */
// 校验参数 // 校验接口返回值res
export default class JournalController extends BaseController {
  /**
   * @Summary 添加观看记录
   * @Router POST /journal_add
   * @Request body journalAddRequest *body
   * @Response 200 journalAddResponse success
   */
  public async add() {
    const { id, user_id, type, start, stop } = this.ctx.request.body;
    this.ctx.validate(this.addRule());
    const resData = await this.ctx.service.journal.addJournal(id, user_id, type, start, stop);
    this.success({
      code: 1,
      msg: '添加观看记录成功',
      data: resData
    });
  }
  /**
   * @Summary 获取观看记录
   * @Router GET /journal_getbyid
   * @Request body journalGetByIdRequest *body
   * @Response 200 journalGetByIdResponse success
   */
  public async getById() {
    const { id, type, limit, offset } = this.ctx.request.body;
    this.ctx.validate(this.getRule('id'));
    const resData = await this.ctx.service.journal.getByIdJournal(id, type, limit, offset);
    this.success({
      code: 1,
      msg: '获取观看记录成功',
      data: resData
    });
  }
  /**
   * @Summary 获取观看记录
   * @Router GET /journal_getbyuser
   * @Request body journalGetByUserRequest *body
   * @Response 200 journalGetByUserResponse success
   */
  public async getByUser() {
    const { user_id, type, limit, offset } = this.ctx.request.body;
    this.ctx.validate(this.getRule('user_id'));
    const resData = await this.ctx.service.journal.getByUserJournal(user_id, type, limit, offset);
    this.success({
      code: 1,
      msg: '获取观看记录成功',
      data: resData
    });
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
      user_id: {
        type: 'string',
        required: true
      }
    };
  }
}
