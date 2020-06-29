module.exports = function(Sequelize) {
  const { STRING, INTEGER, JSON, DATE } = Sequelize;
  return {
    id: { type: STRING(70), primaryKey: true },
    course: STRING(70),
    course_type_id: STRING(70),
    course_cover: STRING(1000),
    course_describe: STRING(100),
    course_videos: JSON(1000),
    watch_num: INTEGER(10),
    created_at: DATE,
    updated_at: DATE
  };
};
