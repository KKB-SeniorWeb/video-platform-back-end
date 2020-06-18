import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { VIDEO_UPLOAD } from '../../../app/const/';
import * as path from 'path';

function getVideoPath(fileName) {
  return path.join(path.normalize(__dirname + '../../../..'), `uploadFile/upload/${fileName}`);
}

function uploadFileByStream(apiName, assertSuccess) {
  describe('videoData', () => {
    it('单文件未上传文件,应该失败', async () => {
      const result = await app
        .httpRequest()
        .post(apiName)
        .set('content-type', 'multipart/form-data')
        .field('videoName', 'this_file')
        .attach('', '');

      assert(result.status === 400);
      assert(result.body.code === 0);
      assert(result.body.msg === "Can't found upload file");
    });
    it('单文件后缀名不是MP4文件', async () => {
      const result = await app
        .httpRequest()
        .post(apiName)
        .set('content-type', 'multipart/form-data')
        .field('videoName', '2020.02.18.21.05.html')
        .attach('videoData', getVideoPath('2020.02.18.21.05.html'));

      assert(result.status === 400);
      assert(result.body.code === 0);
      assert(result.body.msg === '请上传正确格式的视频！');
    });
    it('单视频上传成功！', async () => {
      const result = await app
        .httpRequest()
        .post(apiName)
        .set('content-type', 'multipart/form-data')
        .field('videoName', 'EV~2020.02.18~21.06.30.mp4')
        .attach('videoData', getVideoPath('EV~2020.02.18~21.06.30.mp4'));

      assertSuccess(result);
      assert(result.body.data.videoName === 'EV~2020.02.18~21.06.30.mp4');
    });
  });
}

describe('test/app/controller/video.test.ts', async () => {
  const apiName = VIDEO_UPLOAD;

  const assertSuccess = result => {
    assert(result.status === 200);
    assert(result.body.code === 1);
    assert(result.body.msg === '视频上传成功！');
  };
  uploadFileByStream(apiName, assertSuccess);
});
