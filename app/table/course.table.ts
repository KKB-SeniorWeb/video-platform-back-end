module.exports = function(Sequelize) {
  const { STRING, INTEGER, DATE } = Sequelize;

  return {
    id: { type: STRING(70), primaryKey: true },
    name: STRING(30),
    path: STRING(100),
    user_id: INTEGER(100),
    created_at: DATE,
    updated_at: DATE
  };
};
