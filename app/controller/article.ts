import BaseController from '../core/BaseController';

/**
 * @Controller
 */
export default class ArticleController extends BaseController {
  /**
   * @Summary 新建文章
   * @Router POST /article/create
   * @Request body articleCreateRequest *body
   * @Response 200 articleCreateResponse success
   */
  public async create() {
    const { title, cover, describe, content, authorId } = this.ctx.request.body;
    this.ctx.validate(this.createRule());
    const result = await this.ctx.service.article.create(title, cover, describe, content, authorId);
    this.success({
      code: 1,
      msg: '新建文章成功',
      data: result.id
    });
  }
  /**
   * @Summary 编辑文章
   * @Router POST /article/update
   * @Request body articleUpdateRequest *body
   * @Response 200 articleUpdateResponse success
   */
  public async update() {
    const { id, title, cover, describe, content, authorId } = this.ctx.request.body;
    this.ctx.validate({ ...this.rule(), ...this.createRule() });
    const result = await this.ctx.service.article.update(id, title, cover, describe, content, authorId);
    this.success({
      code: 1,
      msg: '更新文章成功',
      data: result.id
    });
  }
  /**
   * @Summary 删除文章
   * @Router DELETE /article/delete
   * @Request body articleDeleteRequest *body
   * @Response 200 articleDeleteResponse success
   */
  public async delete() {
    const { id } = this.ctx.request.body;
    this.ctx.validate(this.rule());
    await this.ctx.service.article.delete(id);
    this.success({
      code: 1,
      msg: '删除文章成功'
    });
  }
  /**
   * @Summary 获取文章
   * @Router GET /article/get
   * @Request body articleGetRequest *body
   * @Response 200 articleGetResponse success
   */
  public async get() {
    const { id } = this.ctx.query;
    this.ctx.validate(this.rule(), this.ctx.query);
    const result = await this.ctx.service.article.findOne(id);
    this.success({
      code: 1,
      msg: '获取文章成功',
      data: result
    });
  }
  /**
   * @Summary 获取文章列表
   * @Router GET /article/get/list
   * @Request body articleGetListRequest *body
   * @Response 200 articleGetListResponse success
   */
  public async getList() {
    const { offset, limit, sort = 'time' } = this.ctx.query;
    const result = await this.ctx.service.article.findAll(
      offset ? Number(offset) : undefined,
      limit ? Number(limit) : undefined,
      sort
    );
    this.success({
      code: 1,
      msg: '获取文章列表成功',
      data: result
    });
  }
  private rule() {
    return {
      id: {
        type: 'string',
        requerid: true
      }
    };
  }
  private createRule() {
    return {
      title: {
        type: 'string',
        requerid: true
      },
      cover: {
        type: 'string',
        requerid: true
      },
      describe: {
        type: 'string',
        requerid: true
      },
      content: {
        type: 'string',
        requerid: true
      },
      authorId: {
        type: 'string',
        requerid: true
      }
    };
  }
}
