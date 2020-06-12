// file-type模块 用于判别文件真实路径
import { fromStream } from 'file-type';
import * as path from 'path';
import * as fs from 'fs';
import * as sendToWormhole from 'stream-wormhole';
import { Context } from 'egg';

const translate = {
  video: '视频',
  topic: '文章'
};

const getVideoPath = (type, fileName) => {
  return path.join(path.normalize(__dirname + '../../..'), `uploadFile/${type}/${fileName}`);
};

export const upload = async (ctx: Context, type: 'topic' | 'video', rule: string[]) => {
  const stream = await ctx.getFileStream();
  // const fileName = path.basename(stream.filename);
  const { video_name, video_cover } = stream.fields;
  // 文件处理，上传到云存储等等
  // console.log(await fromStream(part));
  // fromStream 必须要用变量存储 如果不存储后续获取的文件类型会错误
  const realExt = await fromStream(stream);
  if (!rule.includes(realExt?.ext as string)) {
    await sendToWormhole(stream);
    ctx.throw(400, `请上传正确格式的${translate[type]}！`);
  }
  if (
    // fromStream(stream: FileStream) 接受stream流 return {ext: FileExtension, mime: MimeType}
    // ext为文件后缀名(不带.) mime为文件类型
    realExt?.ext.toLowerCase() !==
    path
      .extname(video_name)
      .substr(1)
      .toLowerCase()
  ) {
    await sendToWormhole(stream);
    ctx.throw(400, `该${translate[type]}后缀不符合真实后缀，求修改后重新上传！`);
  }
  let result;
  try {
    const remoteFileStream = fs.createWriteStream(getVideoPath(type, video_name));
    result = await stream.pipe(remoteFileStream);
    // result = await ctx.oss.put(name, stream);
  } catch (err) {
    // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
    await sendToWormhole(stream);
    throw err;
  }
  const { id, video_name: videoName } = await ctx.service[type].upload({
    video_cover,
    video_path: result.path,
    video_name
  });
  console.log(result.path, stream.fields);
  const data = {
    id,
    videoName
  };
  ctx.helper.success({
    data,
    msg: '视频上传成功！'
  });
};
