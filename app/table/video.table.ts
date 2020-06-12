module.exports = function(Sequelize) {
  const { STRING, DATE, INTEGER } = Sequelize;

  return {
    id: { type: STRING(70), primaryKey: true },
    video_name: STRING(30),
    video_path: STRING(1000),
    video_cover: STRING(1000),
    created_at: DATE,
    updated_at: DATE,
    visitor_number: INTEGER
  };
};
