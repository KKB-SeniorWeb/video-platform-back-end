import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

function generateToken(role = 'master') {
  const token = app.jwt.sign({ role }, app.config.jwt.secret);
  return token;
}

describe('test/app/controller/article.ts', () => {
  it('create 新建文章', async () => {
    // given
    const articleInfo = {
      title: '文章标题test',
      cover: '文章副标题test',
      describe: '文章描述test',
      content: '文章内容test',
      author_id: '作者id test'
    };
    const token = generateToken();
    // when
    const result = await app
      .httpRequest()
      .post('/article/create/course')
      .set('Authorization', 'Bearer ' + token)
      .send(articleInfo);
    console.log('-----------', result.body);
    // then
    assert(result.body);
  });
});
