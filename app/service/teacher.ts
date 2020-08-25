import { Service } from 'egg';
import { v4 as uuidv4 } from 'uuid';

export default class TeacherService extends Service {
  /**
   * 添加讲师
   * @param name
   * @param photo
   * @param describe
   * @param gender
   * @param age
   */
  public async add(name, photo, describe, gender, age) {
    const resData = await this.app.model.Teacher.create({
      id: uuidv4(),
      name,
      photo,
      describe,
      gender,
      age
    });
    return resData.toJSON();
  }
  /**
   * 删除讲师
   * @param id
   */
  public async delete(id) {
    await this.findOne(id);
    const resData = await this.app.model.Teacher.destroy({
      where: { id }
    });
    return resData;
  }
  /**
   * name
   */
  public async update(id, name, photo, describe, gender, age) {
    await this.app.model.Teacher.update(
      {
        name,
        photo,
        describe,
        gender,
        age
      },
      { where: { id } }
    );
    const resData = await this.findOne(id);
    return resData;
  }
  public async get() {
    const resData = await this.app.model.Teacher.findAndCountAll({
      order: [['name', 'DESC']]
    });
    return resData;
  }
  public async findOne(id) {
    const resData = await this.app.model.Teacher.findOne({
      where: { id }
    });
    if (!resData || !resData.toJSON()) {
      this.ctx.throw('没有找到此讲师');
    }
    return resData ? resData.toJSON() : resData;
  }
}
