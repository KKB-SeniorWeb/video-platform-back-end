const { MYSQL_HOST, MYSQL_PORT } = process.env;
export default () => {
  const sequelize = {
    dialect: 'mysql',
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    username: 'root',
    password: '123456',
    database: 'video_platform_test'
  };

  return {
    sequelize
  };
};
