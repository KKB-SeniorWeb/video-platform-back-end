// file-type模块 用于判别文件真实路径
import { fromStream } from 'file-type';
import * as path from 'path';
import * as fs from 'fs';
import * as sendToWormhole from 'stream-wormhole';
import { Context, FileStream } from 'egg';

interface IRes {
  success: any[];
  failed: any[];
}

const translate = {
  video: '视频',
  topic: '文章'
};

const noFile = async (res: IRes, type: string, part: FileStream) => {
  res.failed.push({
    reason: `请上传${translate[type]}！`,
    fileName: part.filename || ''
  });
  await sendToWormhole(part);
};

export const upload = async (ctx: Context, type: 'topic' | 'video', rule: string[]) => {
  const res: IRes = {
    success: [],
    failed: []
  };
  // const { videoName, videoCover } = ctx.request.query;
  const parts = ctx.multipart();
  let part;
  // console.log(videoName, videoCover);
  while ((part = await parts()) != null) {
    if (part.length) {
      // 这是 busboy 的字段
      // console.log('field: ' + part[0]);
      // console.log('value: ' + part[1]);
      // console.log('valueTruncated: ' + part[2]);
      // console.log('fieldnameTruncated: ' + part[3]);
    } else {
      if (!part.filename) {
        await noFile(res, type, part);
        continue;
      }
      const fileName = part.filename;
      // part 是上传的文件流
      // console.log('field: ' + part.fieldname);
      // console.log('filename: ' + part.filename);
      // console.log('extname: ' + path.extname(part.filename));
      // console.log('encoding: ' + part.encoding);
      // console.log('mime: ' + part.mime);
      // 文件处理，上传到云存储等等
      // console.log(await fromStream(part));
      // fromStream 必须要用变量存储 如果不存储后续获取的文件类型会错误
      const realExt = await fromStream(part);
      if (!rule.includes(realExt?.ext as string)) {
        res.failed.push({
          reason: `请上传正确格式的${translate[type]}！`,
          fileName
        });
        await sendToWormhole(part);
        continue;
      }
      if (
        // fromStream(stream: FileStream) 接受stream流 return {ext: FileExtension, mime: MimeType}
        // ext为文件后缀名(不带.) mime为文件类型
        realExt?.ext.toLowerCase() !==
        path
          .extname(fileName)
          .substr(1)
          .toLowerCase()
      ) {
        res.failed.push({
          reason: `该${translate[type]}后缀不符合真实后缀，求修改后重新上传！`,
          fileName
        });
        await sendToWormhole(part);
        continue;
      }
      let result;
      try {
        // 创建文件写入流
        const remoteFileStream = fs.createWriteStream(
          path.join('/Users/zhangyuxuan/Desktop/', `uploadFile/${type}/${fileName}`)
        );
        // 以管道方式写入流
        result = await part.pipe(remoteFileStream);
        // result = await ctx.oss.put('~/uploadFile' + part.filename, part);
      } catch (err) {
        // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
        await sendToWormhole(part);
        throw err;
      }
      const { id, video_name: videoName } = await ctx.service[type].upload({
        video_path: result.path,
        video_name: fileName
      });
      res.success.push({ id, videoName });
    }
  }
  if (!res.success.length && res.failed.length) {
    ctx.helper.fail({
      data: res.failed,
      msg: `${translate[type]}上传失败，请查看失败原因！`
    });
  } else if (res.success.length && res.failed.length) {
    ctx.helper.success({
      data: res,
      msg: `部分${translate[type]}上传成功，请查看未成功文件信息！`
    });
  } else if (!res.success.length && !res.failed.length) {
    ctx.helper.fail({
      data: [
        {
          reason: `请上传${translate[type]}！`,
          fileName: ''
        }
      ],
      msg: `${translate[type]}上传失败，请查看失败原因！`
    });
  } else {
    ctx.helper.success({
      data: res.success,
      msg: `${translate[type]}上传成功！`
    });
  }
};
