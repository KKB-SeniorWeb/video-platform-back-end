import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { COURSE } from '../../../app/const/';

function createCourse(info = {}) {
  const defaultInfo = {
    course: '教程名称',
    course_type_id: '分类id',
    course_cover: '教程封面',
    course_describe: '教程描述',
    course_videos: []
  };
  return Object.assign({}, defaultInfo, info);
}

function TestAdd() {
  describe('添加教程', () => {
    it('success', async () => {
      const result = await app
        .httpRequest()
        .post(COURSE)
        .send(createCourse());

      assert(result.status === 200);
      assert(result.body.msg === '添加教程成功！');
      assert(result.body.code === 1);
    });
  });
}

describe('test/app/controller/course.test.ts', async () => {
  TestAdd();
});
