// eslint-disable-next-line @typescript-eslint/no-var-requires
const userTable = require('../table/user.table');
module.exports = app => {
  const User = app.model.define('user', userTable(app.Sequelize));
  return User;
};
