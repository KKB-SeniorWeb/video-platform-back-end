import { Controller } from 'egg';

/**
 * @Controller
 */
export default class HomeController extends Controller {
  /**
   * @Summary 创建资源
   * @Router POST /home/1234
   * @Request body createResource *body resourceInfo
   * @Request header string access_token
   * @Response 200 baseResponse
   * @Response 400 baseResponse
   */
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }
}
