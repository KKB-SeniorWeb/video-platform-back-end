import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

function generateToken(role = 'master', uId = 123456) {
  const token = app.jwt.sign({ uId, role }, app.config.jwt.secret);
  return token;
}
async function articleInfoToDB() {
  const articleInfo = {
    id: '123456',
    title: '文章标题test1234',
    cover: '文章副标题test1234',
    describe: '文章描述test1234',
    content: '文章内容test1234',
    authorId: '作者id test1234',
    hot: 1
  };
  await (app as any).factory.create('article', articleInfo);
  return articleInfo;
}

describe('article e2e', () => {
  it('create 新建文章', async () => {
    const token = generateToken('admin');
    const info = {
      title: '文章标题test1234',
      cover: '文章副标题test1234',
      describe: '文章描述test1234',
      content: '文章内容test1234',
      authorId: '作者id test1234',
      hot: 1
    };
    // when
    const result = await app
      .httpRequest()
      .post('/article/create')
      .set('Authorization', 'Bearer ' + token)
      .send(info);
    // then
    assert(result.body.code === 1);
    assert(result.body.msg === '新建文章成功');
  });

  it('delete 删除文章', async () => {
    const token = generateToken('master');
    const articleInfo = await articleInfoToDB();
    const result = await app
      .httpRequest()
      .delete('/article/delete')
      .set('Authorization', 'Bearer ' + token)
      .send({ id: articleInfo.id });

    assert(result.body.code === 1);
    assert(result.body.msg === '删除文章成功');
  });
  it('update 更新文章', async () => {
    const token = generateToken('master');
    const articleInfo = await articleInfoToDB();
    // when
    const result = await app
      .httpRequest()
      .post('/article/update')
      .set('Authorization', 'Bearer ' + token)
      .send(articleInfo);
    // then
    assert(result.body.code === 1);
    assert(result.body.msg === '更新文章成功');
  });
  it('get 获取文章', async () => {
    const token = await generateToken('master');
    const articleInfo = await articleInfoToDB();

    const result = await app
      .httpRequest()
      .get('/article/get')
      .set('Authorization', 'Bearer ' + token)
      .query({ id: articleInfo.id });
    assert(result.body.code === 1);
    assert(result.body.msg === '获取文章成功');
  });
  it('getList 获取文章列表', async () => {
    const token = await generateToken('master');

    const result = await app
      .httpRequest()
      .get('/article/get/list')
      .set('Authorization', 'Bearer ' + token)
      .send();

    assert(result.body.code === 1);
    assert(result.body.msg === '获取文章列表成功');
  });
});
