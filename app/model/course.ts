const courseTable = require('../table/course.table');
module.exports = app => {
  const Course = app.model.define('course', courseTable(app.Sequelize));
  Course.associate = function() {
    app.model.Course.belongsToMany(app.model.Video, {
      through: 'courses_video',
      foreignKey: 'course_id'
    });
  };
  return Course;
};
