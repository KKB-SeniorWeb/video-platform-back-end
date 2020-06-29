const course_userTable = require('../table/course_video.table');
module.exports = app => {
  const Course_Video = app.model.define('courses_video', course_userTable(app.Sequelize));
  return Course_Video;
};
