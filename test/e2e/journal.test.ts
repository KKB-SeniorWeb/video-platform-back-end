import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

function generateToken(role = 'master', uId = 123456) {
  const token = app.jwt.sign({ uId, role }, app.config.jwt.secret);
  return token;
}

describe('journal e2e', () => {
  describe('/journal/add/:type  添加观看记录', () => {
    it('添加教程观看记录', async () => {
      const token = generateToken('admin');
      const info = {
        id: '1234567890',
        user_id: '123456'
      };
      await (app as any).factory.create('course', info);

      const result = await app
        .httpRequest()
        .post('/journal/add/course')
        .set('Authorization', 'Bearer ' + token)
        .send({ id: info.id, userId: info.user_id, start: Date.now(), stop: Date.now() });

      assert(result.body.code === 1);
      assert(result.body.msg === '添加观看记录成功');
    });
    it('添加文章观看记录', async () => {
      const token = generateToken('admin');
      const info = {
        id: '1234567890',
        author_id: '123456'
      };
      await (app as any).factory.create('article', info);

      const result = await app
        .httpRequest()
        .post('/journal/add/article')
        .set('Authorization', 'Bearer ' + token)
        .send({ id: info.id, userId: info.author_id, start: Date.now(), stop: Date.now() });

      assert(result.body.code === 1);
      assert(result.body.msg === '添加观看记录成功');
    });
    it('添加视频观看记录', async () => {
      const token = generateToken('admin');
      const info = {
        id: '1234567890',
        user_id: '123456'
      };
      await (app as any).factory.create('video', info);

      const result = await app
        .httpRequest()
        .post('/journal/add/video')
        .set('Authorization', 'Bearer ' + token)
        .send({ id: info.id, userId: info.user_id, start: Date.now(), stop: Date.now() });

      assert(result.body.code === 1);
      assert(result.body.msg === '添加观看记录成功');
    });
  });
  describe('/journal/id/:type  查询观看记录', () => {
    it('查询教程观看记录', async () => {
      const token = generateToken('admin');
      const info = {
        id: '1234567890',
        type: 1,
        watch_id: '123456',
        user_id: 'yanyan123456'
      };
      await (app as any).factory.create('journal', info);

      const result = await app
        .httpRequest()
        .get('/journal/id/course')
        .set('Authorization', 'Bearer ' + token)
        .send({ id: info.watch_id, offset: 0, limit: 20 });

      assert(result.body.code === 1);
      assert(result.body.msg === '获取观看记录成功');
    });
    it('查询文章观看记录', async () => {
      const token = generateToken('admin');
      const info = {
        id: '1234567890',
        type: 2,
        watch_id: '123456',
        user_id: 'yanyan123456'
      };
      await (app as any).factory.create('journal', info);

      const result = await app
        .httpRequest()
        .get('/journal/id/course')
        .set('Authorization', 'Bearer ' + token)
        .send({ id: info.watch_id, offset: 0, limit: 20 });

      assert(result.body.code === 1);
      assert(result.body.msg === '获取观看记录成功');
    });
    it('查询教程观看记录', async () => {
      const token = generateToken('admin');
      const info = {
        id: '1234567890',
        type: 3,
        watch_id: '123456',
        user_id: 'yanyan123456'
      };
      await (app as any).factory.create('journal', info);

      const result = await app
        .httpRequest()
        .get('/journal/id/course')
        .set('Authorization', 'Bearer ' + token)
        .send({ id: info.watch_id, offset: 0, limit: 20 });

      assert(result.body.code === 1);
      assert(result.body.msg === '获取观看记录成功');
    });
  });
  describe('/journal/user/course', () => {
    it('查询用户教程观看记录', async () => {
      const token = generateToken('admin');
      const info = {
        id: '1234567890',
        type: 1,
        watch_id: '123456',
        user_id: 'yanyan123456'
      };
      await (app as any).factory.create('journal', info);

      const result = await app
        .httpRequest()
        .get('/journal/id/course')
        .set('Authorization', 'Bearer ' + token)
        .send({ id: info.watch_id, userId: info.user_id, offset: 0, limit: 20 });

      assert(result.body.code === 1);
      assert(result.body.msg === '获取观看记录成功');
    });
    it('查询用户文章观看记录', async () => {
      const token = generateToken('admin');
      const info = {
        id: '1234567890',
        type: 2,
        watch_id: '123456',
        user_id: 'yanyan123456'
      };
      await (app as any).factory.create('journal', info);

      const result = await app
        .httpRequest()
        .get('/journal/id/article')
        .set('Authorization', 'Bearer ' + token)
        .send({ id: info.watch_id, userId: info.user_id, offset: 0, limit: 20 });

      assert(result.body.code === 1);
      assert(result.body.msg === '获取观看记录成功');
    });
    it('查询用户视频观看记录', async () => {
      const token = generateToken('admin');
      const info = {
        id: '1234567890',
        type: 3,
        watch_id: '123456',
        user_id: 'yanyan123456'
      };
      await (app as any).factory.create('journal', info);

      const result = await app
        .httpRequest()
        .get('/journal/id/video')
        .set('Authorization', 'Bearer ' + token)
        .send({ id: info.watch_id, userId: info.user_id, offset: 0, limit: 20 });

      assert(result.body.code === 1);
      assert(result.body.msg === '获取观看记录成功');
    });
  });
});
