'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('UserTeachers', 'status', Sequelize.STRING);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('UserTeachers', 'status');
  }
};
