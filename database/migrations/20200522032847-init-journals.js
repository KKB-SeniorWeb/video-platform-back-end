'use strict';
const journalTable = require('../../app/table/journal.table.ts')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('journals', journalTable(Sequelize))
  },

  down: async queryInterface => {
    await queryInterface.dropTable('journals');
  }
};