import * as assert from 'assert';
import { Context } from 'egg';
import { app, mock } from 'egg-mock/bootstrap';

describe('test/app/service/article.test.ts', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });
  describe('article/create 新建文章 ', () => {
    const params = {
      title: 'TypeScript',
      cover: 'TypeScript',
      describe: '描述描述描述描述描述',
      content: '文章内容TypeScript',
      authorId: '作者2'
    };
    it('新建文章成功', async () => {
      mock(app.model.Article, 'create', () => {
        return {
          toJSON() {
            return { id: '字符串id' };
          }
        };
      });
      const resData = await ctx.service.article.create(
        params.title,
        params.cover,
        params.describe,
        params.content,
        params.authorId
      );
      assert(resData.id);
    });
  });
});
