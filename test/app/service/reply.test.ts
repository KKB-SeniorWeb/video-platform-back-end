import * as assert from 'assert';
import { Context } from 'egg';
import { app, mock } from 'egg-mock/bootstrap';

function createParams(info = {}) {
  const defaultInfo = {
    userId: '用户id',
    watchId: '资源id',
    reply: '评论内容'
  };
  return Object.assign({}, defaultInfo, info);
}
async function TestPush(ctx, Model, params) {
  mock(Model, 'findOne', () => {
    return {
      toJSON() {
        return {};
      }
    };
  });
  let type;
  if (Model === app.model.Article) {
    type = 2;
  } else if (Model === app.model.Video) {
    type = 3;
  }
  const resData = await ctx.service.reply.push(type, params.userId, params.watchId, params.reply);

  assert(resData.user_id === params.userId);
  assert(resData.watch_id === params.watchId);
  assert(resData.reply === params.reply);
}

async function TestGetList(ctx, Model, resourcse) {
  mock(Model, 'findOne', () => {
    return {
      toJSON() {
        return {};
      }
    };
  });
  mock(app.model.Reply, 'findAll', () => {
    return {
      toJSON() {
        return [];
      }
    };
  });
  mock(app.model.User, 'findOne', () => {
    return {
      toJSON() {
        return {};
      }
    };
  });
  let type;
  if (resourcse === 'article') {
    type = 2;
  } else if (resourcse === 'video') {
    type = 3;
  }
  const param = { id: '文章id', type, offset: 1, limit: 10 };
  const resData = await ctx.service.reply.getList(param.id, param.type, param.offset, param.limit);
  assert(resData);
}

describe('test/app/service/reply.test.ts', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });
  describe('reply/push/article 发表文章评论', () => {
    const params = createParams();
    it('发表文章评论成功', async () => {
      await TestPush(ctx, app.model.Article, params);
    });
  });
  describe('reply/push/video 发表视频评论', () => {
    const params = createParams();
    it('发表视频评论成功', async () => {
      await TestPush(ctx, app.model.Video, params);
    });
  });
  describe('reply/get 获取单个评论', () => {
    it('获取单个评论成功', async () => {
      mock(app.model.Reply, 'findOne', () => {
        return {
          toJSON() {
            return { id: '评论id' };
          }
        };
      });
      mock(app.model.Reply, 'findAll', () => {
        return {
          toJSON() {
            return [];
          }
        };
      });
      mock(app.model.User, 'findOne', () => {
        return {
          toJSON() {
            return {};
          }
        };
      });
      const param = { id: '评论id' };
      const resData = await ctx.service.reply.get(param.id);
      assert(resData);
    });
  });
  describe('reply/get/list/article 获取文章评论列表', () => {
    it('获取文章评论列表成功', async () => {
      TestGetList(ctx, app.model.Article, 'article');
    });
  });
  describe('reply/get/list/video 获取视频评论列表', () => {
    it('获取视频评论列表成功', async () => {
      TestGetList(ctx, app.model.Video, 'video');
    });
  });
});
