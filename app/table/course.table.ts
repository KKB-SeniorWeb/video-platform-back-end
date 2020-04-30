module.exports = function(Sequelize) {
  const { STRING, DATE } = Sequelize;

  return {
    id: { type: STRING(70), primaryKey: true },
    user_id:STRING(100),
    course_name:STRING(30),
    watch_at:DATE,
    created_at: DATE,
    updated_at: DATE
  };
};
//这里table导出数据库字段
