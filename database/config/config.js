const { MYSQL_HOST, MYSQL_PORT } = process.env;

module.exports = () => ({
  development: {
    username: 'root',
    password: '123456',
    database: 'video_platform_development',
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false
  },
  test: {
    username: 'root',
    password: '123456',
    database: 'video_platform_test',
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    dialect: 'mysql',
    operatorsAliases: false
  },
  production: {
    username: 'root',
    password: '123456',
    database: 'video_platform',
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    dialect: 'mysql',
    operatorsAliases: false
  }
});
