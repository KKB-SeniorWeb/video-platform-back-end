'use strict';
const replyTable = require('../../app/table/reply.table.ts');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('replys', replyTable(Sequelize))
  },

  down: async queryInterface => {
    await queryInterface.dropTable('replys')
  }
};