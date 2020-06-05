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
    // 通过id去查询表中（教程/文章/视频）信息，并返回 - service
    this.success({
      code: 1,
      msg: '添加观看记录成功',
      data: resData
    });
  }
  /**
   * @Summary 获取观看记录
   * @Router GET /journal_get
   * @Request body journalGetRequest *body
   * @Response 200 journalGetResponse success
   */
  public async get() {
    const { id, type, start, stop, limit, offset } = this.ctx.request.body;
    this.ctx.validate(this.getRule());
    const resData = await this.ctx.service.journal.getJournal(id, type, start, stop, limit, offset);
    this.success({
      code: 1,
      msg: '获取观看记录成功',
      data: resData
    });
  }
  /**
   * @Summary 获取观看记录
   * @Router GET /journal_getu
   * @Request body journalGetURequest *body
   * @Response 200 journalGetUResponse success
   */
  public async getu() {
    const { user_id, type, start, stop, limit, offset } = this.ctx.request.body;
    this.ctx.validate(this.getuRule());
    const resData = await this.ctx.service.journal.getuJournal(user_id, type, start, stop, limit, offset);
    this.success({
      code: 1,
      msg: '获取观看记录成功',
      data: resData
    });
  }
  private getuRule() {
    return {
      user_id: {
        type: 'string',
        required: true
      },
      type: {
        type: 'int',
        required: false
      },
      start: {
        type: 'int',
        required: false
      },
      stop: {
        type: 'int',
        required: false
      },
      limit: {
        type: 'int',
        required: false
      },
      offset: {
        type: 'int',
        required: false
      }
    };
  }
  private getRule() {
    return {
      id: {
        type: 'string',
        required: true
      },
      type: {
        type: 'int',
        required: false
      },
      start: {
        type: 'int',
        required: false
      },
      stop: {
        type: 'int',
        required: false
      },
      limit: {
        type: 'int',
        required: false
      },
      offset: {
        type: 'int',
        required: false
      }
    };
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
      },
      type: {
        type: 'int',
        required: false
      },
      start: {
        type: 'int',
        required: false
      },
      stop: {
        type: 'int',
        required: false
      }
    };
  }
}
