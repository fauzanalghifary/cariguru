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
        fullName: 'Alberto Gilardino',
        field: 'Fisika',
        yearOfExperience: 3,
        fee: 50000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: 'Morientes',
        field: 'Matematika',
        yearOfExperience: 5,
        fee: 100000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: 'Aquilani',
        field: 'Kimia',
        yearOfExperience: 1,
        fee: 40000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert('Teachers', data);
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
