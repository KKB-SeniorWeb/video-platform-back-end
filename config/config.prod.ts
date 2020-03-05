export default () => {
  const sequelize = {
    dialect: 'mysql',
    host: '150.109.116.73',
    port: '3306',
    username: 'root',
    password: '123456',
    database: 'video_platform'
  };

  return {
    sequelize
  };
};
