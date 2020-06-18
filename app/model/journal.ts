const journalTable = require('../table/journal.table');
module.exports = app => {
  const Journal = app.model.define('journal', journalTable(app.Sequelize));
  return Journal;
};
