import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { TEACHER_ADD, TEACHER_DELETE, TEACHER_UPDATE, TEACHER_GET } from '../../../app/const/index';

function generateToken(role = 'master') {
  const token = app.jwt.sign({ role }, app.config.jwt.secret);
  return token;
}
function createTeacher(info = {}) {
  const defaultInfo = {
    name: '姓名',
    photo: '照片地址',
    describe: '描述'
  };
  return Object.assign({}, defaultInfo, info);
}
function paramRequest() {
  describe('name', () => {
    it('name为空时，返回name不能为空的消息', async () => {
      const token = generateToken('master');
      app.mockService('teacher', 'add', () => {
        return true;
      });
      const res = await app
        .httpRequest()
        .post(TEACHER_ADD)
        .set('Authorization', 'Bearer ' + token)
        .send(createTeacher({ name: '' }));

      assert(res.body.code === 0);
    });
  });
  describe('photo', () => {
    it('photo为空时，返回photo不能为空的消息', async () => {
      const token = generateToken('master');
      app.mockService('teacher', 'add', () => {
        return true;
      });
      const res = await app
        .httpRequest()
        .post(TEACHER_ADD)
        .set('Authorization', 'Bearer ' + token)
        .send(createTeacher({ photo: '' }));

      assert(res.body.code === 0);
    });
  });
  describe('describe', () => {
    it('describe为空时，返回describe不能为空的消息', async () => {
      const token = generateToken('master');
      app.mockService('teacher', 'add', () => {
        return true;
      });
      const res = await app
        .httpRequest()
        .post(TEACHER_ADD)
        .set('Authorization', 'Bearer ' + token)
        .send(createTeacher({ describe: '' }));

      assert(res.body.code === 0);
    });
  });
}
function idRequest() {
  describe('id', () => {
    it('id为空时，返回id不能为空的消息', async () => {
      const token = generateToken('master');
      app.mockService('teacher', 'delete', () => {
        return true;
      });
      const res = await app
        .httpRequest()
        .delete(TEACHER_DELETE)
        .set('Authorization', 'Bearer ' + token)
        .send({ id: '' });

      assert(res.body.code === 0);
    });
  });
}
describe('test/app/controller/teacher.test.ts', () => {
  describe('/teacher/add  添加讲师', () => {
    paramRequest();

    it('添加讲师成功', async () => {
      const token = generateToken('master');
      app.mockService('teacher', 'add', () => {
        return true;
      });
      const res = await app
        .httpRequest()
        .post(TEACHER_ADD)
        .set('Authorization', 'Bearer ' + token)
        .send(createTeacher());

      assert(res.body.code === 1);
      assert(res.body.msg === '添加讲师成功');
    });
  });
  describe('/teacher/delete 删除讲师', () => {
    idRequest();

    it('删除讲师成功', async () => {
      const token = generateToken('master');
      app.mockService('teacher', 'delete', () => {
        return true;
      });
      const res = await app
        .httpRequest()
        .delete(TEACHER_DELETE)
        .set('Authorization', 'Bearer ' + token)
        .send({ id: 'a6179cd1-b9bb-49c7-b235-c718a2706451' });

      assert(res.body.code === 1);
      assert(res.body.msg === '删除讲师成功');
    });
  });
  describe('/teacher/update 更新讲师', () => {
    idRequest();
    paramRequest();

    it('更新讲师成功', async () => {
      const token = generateToken('master');
      app.mockService('teacher', 'update', () => {
        return true;
      });
      const res = await app
        .httpRequest()
        .post(TEACHER_UPDATE)
        .set('Authorization', 'Bearer ' + token)
        .send({ id: 'a6179cd1-b9bb-49c7-b235-c718a2706451', ...createTeacher() });

      assert(res.body.code === 1);
      assert(res.body.msg === '更新讲师成功');
    });
  });
  describe('/teacher/get 获取讲师列表', () => {
    it('获取讲师列表成功', async () => {
      const token = generateToken('master');
      app.mockService('teacher', 'get', () => {
        return [];
      });
      const res = await app
        .httpRequest()
        .get(TEACHER_GET)
        .set('Authorization', 'Bearer ' + token)
        .send();

      assert(res.body.code === 1);
      assert(res.body.msg === '获取讲师列表成功');
    });
  });
});
