import BaseController from '../core/BaseController';

/**
 * @Controller
 */
export default class CourseController extends BaseController {
  private static isTime(sort: 'time' | 'hot'): sort is 'time' {
    return sort === 'time';
  }

  /**
   * @Summary 获取教程列表
   * @Router GET /course
   * @Request body courseFindAllRequest *body
   * @Response 200 courseFindAllResponse success
   */
  async findAll() {
    const { ctx } = this;
    const { sort = 'time', limit, page = 1, type = 'all' } = ctx.query;
    const options = {
      where: {
        type
      },
      order: [[CourseController.isTime(sort) ? 'created_at' : 'watch_num', 'DESC']],
      limit: limit ? Number(limit) : null,
      offset: limit ? Number((page - 1) * limit) : null
    };
    type === 'all' && delete options.where;
    const res = await ctx.service.course.findAll(options);
    this.success({
      code: 1,
      msg: '获取教程成功',
      data: res
    });
  }
  /**
   * @Summary 添加教程
   * @Router POST /course
   * @Request body courseCreateRequest *body
   * @Response 200 courseCreateResponse success
   */

  async add() {
    const { ctx } = this;
    const { course, course_type_id, course_cover, course_describe, course_videos } = ctx.request.body;
    ctx.validate(CourseController.rule);
    await ctx.service.course.add({ course, course_type_id, course_cover, course_describe, course_videos });
    this.success({
      code: 1,
      msg: '添加教程成功！'
    });
  }
  private static rule = {
    course: {
      type: 'string',
      required: true
    },
    course_type_id: {
      type: 'string',
      required: true
    },
    course_cover: {
      type: 'string',
      required: true
    },
    course_describe: {
      type: 'string',
      required: true
    }
  };
}
