import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

function generateToken(role = 'master') {
  const token = app.jwt.sign({ role }, app.config.jwt.secret);
  return token;
}
async function articleInfoToDB() {
  const articleInfo = {
    title: '文章标题test1234',
    cover: '文章副标题test1234',
    describe: '文章描述test1234',
    content: '文章内容test1234',
    authorId: '作者id test1234',
    hot: 1
  };
  //   await (app as any).factory.create('article', articleInfo);
  return articleInfo;
}

describe('test/app/controller/article.test.ts', () => {
  let articleInfo;
  let token;
  beforeEach(async () => {
    articleInfo = await articleInfoToDB();
    token = generateToken('master');
  });
  it('create 新建文章', async () => {
    // when
    const result = await app
      .httpRequest()
      .post('/article/create')
      .set('Authorization', 'Bearer ' + token)
      .send(articleInfo);
    // then
    assert(result.body.code === 1);
    assert(result.body.msg === '新建文章成功');
  });

  it('update 更新文章', async () => {
    // when
    const result = await app
      .httpRequest()
      .post('/article/update')
      .set('Authorization', 'Bearer ' + token)
      .send({ id: '已有文章id', ...articleInfo });
    // then
    assert(result.body.code === 1);
    assert(result.body.msg === '更新文章成功');
  });
});
