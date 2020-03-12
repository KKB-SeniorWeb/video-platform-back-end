import BaseController from '../core/BaseController';
import { upload } from '../utils/upload';

/**
 * @Controller
 */
class Video extends BaseController {
  /**
   * @Summary 视频上传
   * @Router POST /video_upload
   * @Request body uploadVideoRequest *body
   * @Response 200 uploadVideoResponse success
   */
  async upload() {
    const { ctx } = this;
    await upload(ctx, 'video', ['mp4']);
  }

  /**
   * @Summary 视频删除
   * @Router POST /video_delete
   * @Request body deleteVideoRequest *body
   * @Response 200 deleteVideoResponse success
   */
  async delete() {
    const { ctx } = this;
    const res = await ctx.service.video.delete(JSON.parse(ctx.request.body.paths));
    console.log(res);
    if (res.every(item => typeof item === 'object')) {
      ctx.body = {
        code: 0,
        msg: '全部视频删除失败！请检查错误信息！',
        res
      };
    } else if (res.some(item => typeof item === 'object') || res.some(item => typeof item === 'string')) {
      ctx.body = {
        code: 1,
        msg: '部分视频删除成功！请检查删除错误的信息！',
        res
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '视频删除成功！',
        res
      };
    }
  }

  async checkAll() {
    const { ctx } = this;
    const { sort, limit, page } = ctx.request.query;
    console.log(sort, limit, page);
  }
}

export default Video;
