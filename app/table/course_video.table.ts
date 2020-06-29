module.exports = function(Sequelize) {
  const { STRING, DATE } = Sequelize;
  return {
    id: { type: STRING(70), primaryKey: true },
    course_id: STRING(70),
    video_id: STRING(70),
    created_at: DATE,
    updated_at: DATE
  };
};
