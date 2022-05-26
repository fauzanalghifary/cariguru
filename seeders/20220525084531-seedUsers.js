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
        username: 'adebayor',
        password: 'adebayor1',
        role: 'teacher',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'woodgate',
        password: 'woodgate1',
        role: 'teacher',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'kanu',
        password: 'kanu1',
        role: 'teacher',
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
