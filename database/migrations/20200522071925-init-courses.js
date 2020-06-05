'use strict';
const courseTable = require('../../app/table/course.table.ts');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('courses', courseTable(Sequelize))
  },

  down: async queryInterface => {
    await queryInterface.dropTable('courses')
  }
};