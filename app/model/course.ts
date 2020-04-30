// eslint-disable-next-line @typescript-eslint/no-var-requires
const courseTable = require('../table/course.table');
module.exports = app => {
  const UserCourse = app.model.define('course', courseTable(app.Sequelize));
  return UserCourse;
};
//这里model层是数据库操作
