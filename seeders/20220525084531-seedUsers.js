'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    let data = [
      {
        username: 'admin',
        password: 'admin',
        role: 'admin',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'gilardino',
        password: 'gilardino1',
        role: 'teacher',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'morientes',
        password: 'morientes1',
        role: 'teacher',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'aquilani',
        password: 'aquilani1',
        role: 'teacher',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'pojan',
        password: 'pojan1',
        role: 'student',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'fauzan',
        password: 'fauzan1',
        role: 'student',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'herdi',
        password: 'herdi1',
        role: 'student',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert('Users', data);
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users');
  }
};
