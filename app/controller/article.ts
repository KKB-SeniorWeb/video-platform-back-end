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
    this.ctx.validate(this.getRule());
    const resData = await this.ctx.service.article.create(title, cover, describe, content, authorId);

    this.success({
      code: 1,
      msg: '新建文章成功',
      data: resData
    });
  }
  private getRule() {
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
