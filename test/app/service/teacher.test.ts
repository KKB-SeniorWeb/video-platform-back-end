import * as assert from 'assert';
import { Context } from 'egg';
import { app, mock } from 'egg-mock/bootstrap';

async function InfoToDB(info = {}) {
  const defaultInfo = {
    name: '姓名',
    photo: '照片地址',
    describe: '描述',
    gender: '未知',
    age: '未知'
  };
  return Object.assign({}, defaultInfo, info);
}
describe('test/app/service/article.test.ts', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });
  describe('/teacher/add  添加讲师', () => {
    it('添加讲师成功', async () => {
      mock(app.model.Teacher, 'create', () => {
        return {
          toJSON() {
            return {};
          }
        };
      });
      const info = await InfoToDB();
      const res = await ctx.service.teacher.add(info.name, info.photo, info.describe, info.gender, info.age);
      assert(res);
    });
  });
  describe('/teacher/delete  删除讲师', () => {
    describe('id', () => {
      it('id不存在时，返回没有找到此讲师的消息', async () => {
        mock(app.model.Teacher, 'destory', () => {
          return {
            toJSON() {
              return true;
            }
          };
        });
        const id = '123456';
        try {
          const res = await ctx.service.teacher.delete(id);
          assert.fail(res);
        } catch (e) {
          assert(e.message === '没有找到此讲师');
        }
      });
    });

    it('删除讲师成功', async () => {
      mock(app.model.Teacher, 'destory', () => {
        return {
          toJSON() {
            return true;
          }
        };
      });
      mock(app.model.Teacher, 'findOne', () => {
        return {
          toJSON() {
            return { id: '123456' };
          }
        };
      });
      const res = await ctx.service.teacher.delete('123456');

      assert(typeof res === 'number');
    });
  });
  describe('/teacher/update  更新讲师', () => {
    describe('id', () => {
      it('id不存在时，返回没有找到此讲师的消息', async () => {
        mock(app.model.Teacher, 'update', () => {
          return {
            toJSON() {
              return true;
            }
          };
        });
        const id = '123456';
        const info = await InfoToDB();
        try {
          const res = await ctx.service.teacher.update(id, info.name, info.photo, info.describe, info.gender, info.age);
          assert.fail(res);
        } catch (e) {
          assert(e.message === '没有找到此讲师');
        }
      });
    });
    it('更新讲师成功', async () => {
      mock(app.model.Teacher, 'findOne', () => {
        return {
          toJSON() {
            return { id: '123456' };
          }
        };
      });
      mock(app.model.Teacher, 'update', () => {
        return {
          toJSON() {
            return true;
          }
        };
      });
      const id = '123456';
      const info = await InfoToDB();
      const res = await ctx.service.teacher.update(id, info.name, info.photo, info.describe, info.gender, info.age);
      assert(res);
    });
  });
  describe('/teacher/get  获取讲师列表', () => {
    it('获取讲师列表成功', async () => {
      mock(app.model.Teacher, 'findAll', () => {
        return [];
      });
      const res = await ctx.service.teacher.get();
      assert(res);
    });
  });
});
