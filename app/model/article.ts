const articleTable = require('../table/article.table');
module.exports = app => {
  const Article = app.model.define('article', articleTable(app.Sequelize));
  return Article;
};
