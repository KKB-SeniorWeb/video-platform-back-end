const replyTable = require('../table/reply.table');
module.exports = app => {
  const Reply = app.model.define('replys', replyTable(app.Sequelize));
  return Reply;
};
