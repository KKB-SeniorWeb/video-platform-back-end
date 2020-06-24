import BaseController from '../core/BaseController';

/**
 * @Controller
 */
export default class TeacherController extends BaseController {
  /**
   * @Summary 添加讲师
   * @Router POST /teacher/add
   * @Request body teacherAddRequest *body
   * @Response 200 teacherAddResponse success
   */
  public async add() {
    const { name, photo, describe, gender = '未知', age = '未知' } = this.ctx.request.body;
    this.ctx.validate(this.addRule());
    await this.ctx.service.teacher.add(name, photo, describe, gender, age);
    this.success({
      code: 1,
      msg: '添加讲师成功'
    });
  }
  /**
   * @Summary 删除讲师
   * @Router POST /teacher/delete
   * @Request body teacherDeleteRequest *body
   * @Response 200 teacherDeleteResponse success
   */
  public async delete() {
    const { id } = this.ctx.request.body;
    this.ctx.validate(this.rule());
    await this.ctx.service.teacher.delete(id);
    this.success({
      code: 1,
      msg: '删除讲师成功'
    });
  }
  /**
   * @Summary 更新讲师
   * @Router POST /teacher/update
   * @Request body teacherUpdateRequest *body
   * @Response 200 teacherUpdateResponse success
   */
  public async update() {
    const { id, name, photo, describe, gender = '未知', age = '未知' } = this.ctx.request.body;
    this.ctx.validate({ ...this.rule(), ...this.addRule() });
    await this.ctx.service.teacher.update(id, name, photo, describe, gender, age);
    this.success({
      code: 1,
      msg: '更新讲师成功'
    });
  }
  /**
   * @Summary 获取讲师列表
   * @Router GET /teacher/get
   * @Response 200 teacherGetResponse success
   */
  public async get() {
    const result = await this.ctx.service.teacher.get();
    this.success({
      code: 1,
      msg: '获取讲师列表成功',
      data: result
    });
  }
  private rule() {
    return {
      id: {
        type: 'string',
        required: true
      }
    };
  }
  private addRule() {
    return {
      name: {
        type: 'string',
        required: true
      },
      photo: {
        type: 'string',
        required: true
      },
      describe: {
        type: 'string',
        required: true
      },
      gender: {
        type: 'string',
        required: false
      },
      age: {
        type: 'string',
        required: false
      }
    };
  }
}
