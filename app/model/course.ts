const courseTable = require('../table/course.table');
module.exports = app => {
  const Course = app.model.define('course', courseTable(app.Sequelize));
  return Course;
};
