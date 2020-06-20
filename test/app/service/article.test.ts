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
            return { id: '新建文章id' };
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
  describe('article/update 更新文章', async () => {
    const params = {
      id: '已有文章id',
      title: 'test文章更新',
      cover: 'test文章更新',
      describe: '描述描述描述描述描述',
      content: 'test文章更新',
      authorId: '作者2'
    };

    describe('文章id', () => {
      it('文章id不存在时,返回没有此文章的消息', async () => {
        mock(app.model.Article, 'findOne', () => {
          return {
            toJSON() {
              return { id: '文章id' };
            }
          };
        });
        try {
          await ctx.service.article.update(
            '',
            params.title,
            params.cover,
            params.describe,
            params.content,
            params.authorId
          );
        } catch (e) {
          assert(e.message === '没有此文章');
        }
      });
    });

    it('更新文章成功', async () => {
      mock(app.model.Article, 'findOne', () => {
        return {
          toJSON() {
            return { id: '已有文章id' };
          }
        };
      });
      const res = await ctx.service.article.update(
        params.id,
        params.title,
        params.cover,
        params.describe,
        params.content,
        params.authorId
      );
      assert.equal(res.id, params.id);
    });
  });
  describe('/article/delete 删除文章', () => {
    describe('文章id', () => {
      it('文章id不存在时,返回没有此文章的消息', async () => {
        mock(app.model.Article, 'findOne', () => {
          return {
            toJSON() {
              return { id: '文章id' };
            }
          };
        });
        try {
          await ctx.service.article.delete('');
        } catch (e) {
          assert(e.message === '没有此文章');
        }
      });
    });
    it('删除文章成功', async () => {
      mock(app.model.Article, 'findOne', () => {
        return {
          toJSON() {
            return { id: '文章id' };
          }
        };
      });
      mock(app.model.Article, 'destroy', () => {
        return 1;
      });
      const res = await ctx.service.article.delete('删除文章id');
      assert(res);
    });
  });
  describe('/article/get 获取文章', () => {
    it('获取文章成功', async () => {
      mock(app.model.Article, 'findOne', () => {
        return {
          toJSON() {
            return { id: '获取文章id' };
          }
        };
      });
      const res = await ctx.service.article.findOne('获取文章id');

      assert(res.id === '获取文章id');
    });
  });
  describe('/article/get/list', () => {
    it('获取文章列表成功', async () => {
      mock(app.model.Article, 'findAll', () => {
        return {
          toJSON() {
            return [];
          }
        };
      });
      const res = await ctx.service.article.findAll(1, 20, 'time');
      assert(res);
    });
  });
});
