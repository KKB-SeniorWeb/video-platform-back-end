import { Service } from 'egg';
import { v4 as uuidv4 } from 'uuid';

interface ArticleUpdateSuccessResData {
  id: string;
  title: string;
  cover: string;
  describe: string;
  content: string;
  authorId: string;
  hot: number;
}
export default class ArticleService extends Service {
  /**
   * 新建文章
   * @param title
   * @param cover
   * @param describe
   * @param content
   * @param authorId
   */

  public async create(title, cover, describe, content, authorId): Promise<ArticleUpdateSuccessResData> {
    const resData = await this.app.model.Article.create({
      id: uuidv4(),
      title,
      cover,
      describe,
      content,
      author_id: authorId,
      hot: 0
    });
    return resData.toJSON();
  }
  /**
   * 编辑文章
   * @param id
   * @param title
   * @param cover
   * @param describe
   * @param content
   * @param authorId
   */
  public async update(id, title, cover, describe, content, authorId): Promise<ArticleUpdateSuccessResData> {
    await this.app.model.Article.update(
      {
        title,
        cover,
        describe,
        content,
        author_id: authorId
      },
      { where: { id } }
    );
    const resData = await this.findOne(id);
    return resData;
  }
  /**
   * 删除文章
   * @param id
   */
  public async delete(id) {
    await this.findOne(id);
    const resData = await this.app.model.Article.destroy({
      where: {
        id
      }
    });
    return resData;
  }
  /**
   * 获取文章
   * @param id
   */
  public async findOne(id) {
    const resData = await this.app.model.Article.findOne({
      where: { id }
    });
    if (!resData || !resData.toJSON()) {
      this.ctx.throw('没有此文章');
    }
    return resData ? resData.toJSON() : resData;
  }
  /**
   * 获取文章列表
   * @param offset
   * @param limit
   * @param sort
   */
  public async findAll(offset, limit, sort) {
    let field = 'created_at';
    if (sort === 'hot') {
      field = 'hot';
    }
    const resData = await this.app.model.Article.findAll({
      order: [[field, 'DESC']],
      offset,
      limit
    });
    return resData;
  }
}
