import * as path from 'path';
import * as fs from 'fs';
import * as sendToWormhole from 'stream-wormhole';
import { Context } from 'egg';
const awaitWriteStream = require('await-stream-ready').write;

const getVideoPath = fileName => {
  return path.join(path.normalize(__dirname + '../../..'), `uploadFile/video/${fileName}`);
};

export const upload = async (ctx: Context, rule: string[]) => {
  const stream = await ctx.getFileStream();
  // const fileName = path.basename(stream.filename);
  const { videoName: video_name, videoCover: video_cover } = stream.fields;
  // 文件处理，上传到云存储等等
  if (
    !rule.includes(
      path
        .extname(video_name)
        .substr(1)
        .toLowerCase()
    )
  ) {
    await sendToWormhole(stream);
    ctx.throw(400, '请上传正确格式的视频！');
  }
  const target = getVideoPath(video_name);
  const remoteFileStream = fs.createWriteStream(target);
  try {
    await awaitWriteStream(stream.pipe(remoteFileStream));
    // result = await ctx.oss.put(name, stream);
  } catch (err) {
    // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
    await sendToWormhole(stream);
    throw err;
  }
  const { id, video_name: videoName } = await ctx.service.video.upload({
    video_cover,
    video_path: target,
    video_name
  });
  ctx.helper.success({
    data: {
      id,
      videoName
    },
    msg: '视频上传成功！'
  });
};
