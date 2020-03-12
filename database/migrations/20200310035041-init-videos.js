// eslint-disable-next-line @typescript-eslint/no-var-requires
const videoTable = require('../../app/table/video.table.ts');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('videos', videoTable(Sequelize));
  },
  down: async queryInterface => {
    await queryInterface.dropTable('videos');
  }
};
