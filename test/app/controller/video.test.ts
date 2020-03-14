import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { VIDEO_UPLOAD } from '../../../app/const/';
import * as path from 'path';

function uploadFileByStream(apiName, assertSuccess, assertFail, assertBoth) {
  describe('videoData', () => {
    it('单文件未上传文件,应该失败', async () => {
      const result = await app
        .httpRequest()
        .post(apiName)
        .set('content-type', 'multipart/form-data')
        .field('name', 'this_file')
        .attach('', '');

      assertFail(result);
    });
    it('单文件后缀名与真实文件类型不符', async () => {
      const result = await app
        .httpRequest()
        .post(apiName)
        .set('content-type', 'multipart/form-data')
        .field('name', 'this_file')
        .attach(
          'this_file',
          path.join(path.normalize(__dirname + '../../../..'), 'uploadFile/video/2020.02.18.21.05.html')
        );

      assertFail(result);
    });
    it('单视频上传成功！', async () => {
      const result = await app
        .httpRequest()
        .post(apiName)
        .set('content-type', 'multipart/form-data')
        .field('name', 'this_file')
        .attach(
          'this_file',
          path.join(path.normalize(__dirname + '../../../..'), 'uploadFile/video/EV~2020.02.18~21.06.30.mp4')
        );

      assertSuccess(result);
      assert(result.body.data[0].videoName === 'EV~2020.02.18~21.06.30.mp4');
    });
    it('多视频上传一个成功一个文件类型有误！', async () => {
      const result = await app
        .httpRequest()
        .post(apiName)
        .set('content-type', 'multipart/form-data')
        .field('name', 'this_file')
        .attach(
          'this_file',
          path.join(path.normalize(__dirname + '../../../..'), 'uploadFile/video/2020.02.18.21.05.html')
        )
        .attach(
          'this_file',
          path.join(path.normalize(__dirname + '../../../..'), 'uploadFile/video/EV~2020.02.18~21.42.47.mp4')
        );

      assertBoth(result);
      assert(result.body.data.success[0].videoName === 'EV~2020.02.18~21.42.47.mp4');
      assert(result.body.data.failed[0].reason === '该视频后缀不符合真实后缀，求修改后重新上传！');
    });
    it('多视频上传成功！', async () => {
      const result = await app
        .httpRequest()
        .post(apiName)
        .set('content-type', 'multipart/form-data')
        .field('name', 'this_file')
        .attach(
          'this_file',
          path.join(path.normalize(__dirname + '../../../..'), 'uploadFile/video/EV~2020.02.18~21.06.30.mp4')
        )
        .attach(
          'this_file',
          path.join(path.normalize(__dirname + '../../../..'), 'uploadFile/video/EV~2020.02.18~21.42.47.mp4')
        );

      assertSuccess(result);
      assert(result.body.data[0].videoName === 'EV~2020.02.18~21.06.30.mp4');
      assert(result.body.data[1].videoName === 'EV~2020.02.18~21.42.47.mp4');
    });
  });
}

describe('test/app/controller/video.test.ts', async () => {
  // beforeEach(() => {
  //   app.mockService('video', 'upload', () => {
  //     return false;
  //   });
  // });
  // afterEach(mock.restore);
  const apiName = VIDEO_UPLOAD;

  const assertFail = result => {
    assert(result.status === 200);
    assert(result.body.code === 0);
    assert(result.body.msg === '视频上传失败，请查看失败原因！');
  };

  const assertSuccess = result => {
    assert(result.status === 200);
    assert(result.body.code === 1);
    assert(result.body.msg === '视频上传成功！');
  };

  const assertBoth = result => {
    assert(result.status === 200);
    assert(result.body.code === 1);
    assert(result.body.msg === '部分视频上传成功，请查看未成功文件信息！');
  };
  uploadFileByStream(apiName, assertSuccess, assertFail, assertBoth);
});
