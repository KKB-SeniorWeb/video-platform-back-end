import { Service } from 'egg';
import { v4 as uuidv4 } from 'uuid';

interface ArticleCreateSuccessResData {
  id: string;
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
  public async create(title, cover, describe, content, authorId): Promise<ArticleCreateSuccessResData> {
    const results = await this.app.model.Article.create({
      id: uuidv4(),
      title,
      cover,
      describe,
      content,
      authorId
    });
    return { id: results.id };
  }
}
