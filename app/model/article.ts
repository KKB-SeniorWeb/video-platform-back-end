const articleTable = require('../table/article.table');
module.exports = app => {
  const Article = app.model.define('articles', articleTable(app.Sequelize));
  return Article;
};
