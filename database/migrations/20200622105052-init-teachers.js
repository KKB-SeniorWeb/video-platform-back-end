'use strict';
const teacherTable = require('../../app/table/teacher.table.ts');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teachers', teacherTable(Sequelize))
  },

  down: async queryInterface => {
    await queryInterface.dropTable('teachers')
  }
};