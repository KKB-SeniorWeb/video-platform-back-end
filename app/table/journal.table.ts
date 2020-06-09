module.exports = function(Sequelize) {
  const { STRING, BIGINT, DATE } = Sequelize;

  return {
    id: { type: STRING(70), primaryKey: true },
    user_id: STRING(100),
    type: BIGINT(1),
    start: BIGINT,
    stop: BIGINT,
    watch_id: STRING(255),
    created_at: DATE,
    updated_at: DATE
  };
};
// 这里table导出数据库字段
