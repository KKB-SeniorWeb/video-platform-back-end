module.exports = function(Sequelize) {
  const { STRING, DATE, INTEGER } = Sequelize;

  return {
    id: { type: STRING(70), primaryKey: true },
    video_name: STRING(30),
    video_path: STRING(100),
    created_at: DATE,
    update_at: DATE,
    visitor_number: INTEGER
  };
};
