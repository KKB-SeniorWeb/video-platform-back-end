import { Service } from 'egg';

// interface TokenOptions {
//   userId: string;
// }

interface AddCourseSuccessResData {
  id: string;
  user_id: string;
}

class AddCourseService extends Service {
  /**
   * @Summary 添加教程观看记录
   * @Router POST /course_add
   * @Request body addCourseRequest *body
   * @Response 200 addCourseResponse success
   */
  public async AddCourseRecord({ id, user_id }: AddCourseSuccessResData) {
    return {
      id,
      user_id
    };
  }
}
export default AddCourseService;
