export default () => {
  const sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '123456',
    database: 'video_platform_test'
  };

  return {
    sequelize
  };
};
