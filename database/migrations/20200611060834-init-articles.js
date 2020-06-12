'use strict';
const articleTable = require('../../app/table/article.table.ts');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('articles', articleTable(Sequelize))
  },

  down: async queryInterface => {
    await queryInterface.dropTable('articles')
  }
};