module.exports = function(Sequelize) {
  const { STRING, DATE } = Sequelize;
  return {
    id: { type: STRING(70), primaryKey: true },
    name: STRING(70),
    age: STRING(100),
    gender: STRING(3),
    photo: STRING(100),
    describe: STRING(1000),
    created_at: DATE,
    updated_at: DATE
  };
};
