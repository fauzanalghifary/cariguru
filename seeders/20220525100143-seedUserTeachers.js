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
        rating: null,
        UserId: 1,
        TeacherId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rating: null,
        UserId: 1,
        TeacherId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rating: null,
        UserId: 2,
        TeacherId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ];
    return queryInterface.bulkInsert('UserTeachers', data);
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('UserTeachers');
  }
};
