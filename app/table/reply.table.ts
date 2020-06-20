module.exports = function(Sequelize) {
  const { STRING, BIGINT, DATE } = Sequelize;
  return {
    id: { type: STRING(70), primaryKey: true },
    type: BIGINT(1),
    user_id: STRING(100),
    watch_id: STRING(100),
    reply: STRING(),
    created_at: DATE,
    updated_at: DATE
  };
};
