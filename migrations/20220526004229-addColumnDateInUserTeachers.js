'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('UserTeachers', 'date', Sequelize.DATE);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('UserTeachers', 'date');

  }
};
