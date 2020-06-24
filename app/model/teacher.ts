const teacherTable = require('../table/teacher.table');
module.exports = app => {
  const Teacher = app.model.define('teacher', teacherTable(app.Sequelize));
  return Teacher;
};
