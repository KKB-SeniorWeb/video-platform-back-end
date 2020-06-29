'use strict';
const articleTable = require('../../app/table/course_video.table.ts');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('courses_videos', articleTable(Sequelize))
  },

  down: async queryInterface => {
    await queryInterface.dropTable('courses_videos')
  }
};
