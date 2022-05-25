'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = [
      {
        username: 'fauzan',
        password: 'fauzan1',
        role: 'user',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'pojan',
        password: 'pojan1',
        role: 'user',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'ghifary',
        password: 'ghifary1',
        role: 'user',
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
