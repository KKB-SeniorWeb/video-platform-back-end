import { Service } from 'egg';
import { v4 as uuidv4 } from 'uuid';

interface IOptions {
  where: {
    type: string;
  };
  order: string[][];
  limit: number;
  offset: number;
}

interface ICourseInfo {
  course: string;
  course_type_id: string;
  course_cover: string;
  course_describe: string;
}

interface ICourseAllInfo extends ICourseInfo {
  course_videos: { id: string; index: number }[] | [];
}

export default class CourseService extends Service {
  /**
   * 获取全部教程
   * @param options
   */
  async findAll(options: IOptions) {
    const res = await this.app.model.Course.findAndCountAll(options);
    return res;
  }

  async add({ course, course_type_id, course_cover, course_describe, course_videos }: ICourseAllInfo) {
    const { ctx } = this;
    let res;
    try {
      res = await this.app.model.Course.create(
        CourseService.generateCourseTable({ course, course_type_id, course_cover, course_describe })
      );
    } catch (e) {
      ctx.throw(e, 400);
    }
    for (let i = 0; i < course_videos?.length; i++) {
      await this.app.model.CourseVideo.create({
        id: uuidv4(),
        course_id: res.id,
        video_id: course_videos[i].id
      });
    }
    return res;
  }

  private static generateCourseTable({ course, course_type_id, course_cover, course_describe }: ICourseInfo) {
    return {
      id: uuidv4(),
      course,
      course_type_id,
      course_cover,
      course_describe,
      watch_num: 0
    };
  }
}
