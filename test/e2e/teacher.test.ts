import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

function generateToken(role = 'master', uId = 123456) {
  const token = app.jwt.sign({ uId, role }, app.config.jwt.secret);
  return token;
}
async function InfoToDB(info = {}) {
  const defaultInfo = {
    name: '姓名',
    photo: '照片地址',
    describe: '描述'
  };
  return Object.assign({}, defaultInfo, info);
}
describe('teacher  e2e', () => {
  describe('/teacher/add  添加讲师', () => {
    let token;
    let info;
    beforeEach(async () => {
      token = generateToken('master');
      info = await InfoToDB();
      await (app as any).factory.create('teacher', info);
    });
    it('添加讲师', async () => {
      const res = await app
        .httpRequest()
        .post('/teacher/add')
        .set('Authorization', 'Bearer ' + token)
        .send(info);

      assert(res.body.code === 1);
      assert(res.body.msg === '添加讲师成功');
    });
  });
  describe('/teacher/delete  删除讲师', () => {
    let token;
    let info;
    beforeEach(async () => {
      token = generateToken('master');
      info = await InfoToDB();
      await (app as any).factory.create('teacher', { id: '123456', info });
    });
    it('删除讲师', async () => {
      const res = await app
        .httpRequest()
        .delete('/teacher/delete')
        .set('Authorization', 'Bearer ' + token)
        .send({ id: '123456' });

      assert(res.body.code === 1);
      assert(res.body.msg === '删除讲师成功');
    });
  });
  describe('/teacher/update  更新讲师', () => {
    let token;
    let info;
    beforeEach(async () => {
      token = generateToken('master');
      info = await InfoToDB();
      await (app as any).factory.create('teacher', { id: '123456', info });
    });
    it('更新讲师', async () => {
      const res = await app
        .httpRequest()
        .post('/teacher/update')
        .set('Authorization', 'Bearer ' + token)
        .send({ id: '123456', ...info });

      assert(res.body.code === 1);
      assert(res.body.msg === '更新讲师成功');
    });
  });
  describe('/teacher/get  获取讲师列表', () => {
    let token;
    beforeEach(async () => {
      token = generateToken('master');
    });
    it('获取讲师列表', async () => {
      const res = await app
        .httpRequest()
        .get('/teacher/get')
        .set('Authorization', 'Bearer ' + token)
        .send();

      assert(res.body.code === 1);
      assert(res.body.msg === '获取讲师列表成功');
    });
  });
});
