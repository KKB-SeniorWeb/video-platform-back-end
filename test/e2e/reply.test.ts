import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

function generateToken(role = 'master', uId = 123456) {
  const token = app.jwt.sign({ uId, role }, app.config.jwt.secret);
  return token;
}

describe('reply e2e', () => {
  it('发表文章评论', async () => {
    // given
    const token = generateToken('admin');
    const info = {
      id: 'aa344383-7805-4d94-af87-05c10d8616d2',
      title: '文章标题test1234',
      cover: '文章副标题test1234',
      describe: '文章描述test1234',
      content: '文章内容test1234',
      authorId: '作者id test1234',
      hot: 1
    };
    await (app as any).factory.create('article', info);
    const param = {
      userId: '123456',
      watchId: info.id,
      reply: '评论内容'
    };
    // when
    const result = await app
      .httpRequest()
      .post('/reply/push/article')
      .set('Authorization', 'Bearer ' + token)
      .send(param);
    // then
    assert(result.body.code === 1);
    assert(result.body.msg === '发表评论成功');
  });
  it('发表视频评论', async () => {
    // given
    const token = generateToken('admin');
    const info = {
      id: '0762ecfc-eb18-482a-a854-29cd22c796be',
      video_name: '视频名称',
      video_path: '视频路径'
    };
    await (app as any).factory.create('video', info);
    const param = {
      userId: '123456',
      watchId: info.id,
      reply: '评论内容'
    };
    // when
    const result = await app
      .httpRequest()
      .post('/reply/push/video')
      .set('Authorization', 'Bearer ' + token)
      .send(param);
    // then
    assert(result.body.code === 1);
    assert(result.body.msg === '发表评论成功');
  });
  it('获取单个评论', async () => {
    // given
    const token = generateToken('admin');
    const info = {
      id: '0762ecfc-eb18-482a-a854-29cd22c796be',
      type: 2,
      user_id: '123456',
      watch_id: '0762ecfc-eb18-482a-a854-29cd22c796be',
      reply: '评论内容'
    };
    await (app as any).factory.create('reply', info);
    // when
    const result = await app
      .httpRequest()
      .get('/reply/get')
      .set('Authorization', 'Bearer ' + token)
      .send({ id: info.id });
    // then
    assert(result.body.code === 1);
    assert(result.body.msg === '获取评论成功');
  });
  it('获取文章评论列表', async () => {
    // given
    const token = generateToken('admin');
    const replyInfo = {
      id: 'ecfc-eb18-482a-a854-29cd22c',
      type: 2,
      user_id: '123456',
      watch_id: '0762ecfc-eb18-482a-a854-29cd22c796be',
      reply: '评论内容'
    };
    const userInfo = {
      id: '123456',
      username: 'yanyan',
      password: '123456'
    };
    const articleInfo = {
      id: '0762ecfc-eb18-482a-a854-29cd22c796be',
      title: 'TypeScript',
      author_id: '123456'
    };
    await (app as any).factory.create('article', articleInfo);
    await (app as any).factory.create('user', userInfo);
    await (app as any).factory.create('reply', replyInfo);
    const param = {
      id: '0762ecfc-eb18-482a-a854-29cd22c796be'
    };
    // when
    const result = await app
      .httpRequest()
      .get('/reply/get/list/article')
      .set('Authorization', 'Bearer ' + token)
      .send(param);
    // then
    assert(result.body.code === 1);
    assert(result.body.msg === '获取评论列表成功');
  });
  it('获取视频评论列表', async () => {
    // given
    const token = generateToken('admin');
    const replyInfo = {
      id: 'ecfc-eb18-482a-a854-29cd22c',
      type: 2,
      user_id: '123456',
      watch_id: '0762ecfc-eb18-482a-a854-29cd22c796be',
      reply: '评论内容'
    };
    const userInfo = {
      id: '123456',
      username: 'yanyan',
      password: '123456'
    };
    const videoInfo = {
      id: '0762ecfc-eb18-482a-a854-29cd22c796be',
      title: 'TypeScript',
      author_id: '123456'
    };
    await (app as any).factory.create('video', videoInfo);
    await (app as any).factory.create('user', userInfo);
    await (app as any).factory.create('reply', replyInfo);
    const param = {
      id: '0762ecfc-eb18-482a-a854-29cd22c796be'
    };
    // when
    const result = await app
      .httpRequest()
      .get('/reply/get/list/video')
      .set('Authorization', 'Bearer ' + token)
      .send(param);
    // then
    assert(result.body.code === 1);
    assert(result.body.msg === '获取评论列表成功');
  });
});
