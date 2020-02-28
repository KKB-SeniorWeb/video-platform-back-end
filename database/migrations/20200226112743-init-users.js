// eslint-disable-next-line @typescript-eslint/no-var-requires
const userTabel = require('../../app/table/user.table.ts');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', userTabel(Sequelize));
  },
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  }
};
