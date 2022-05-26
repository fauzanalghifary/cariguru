'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    let data = [
      {
        fullName: 'Alberto Gilardino',
        field: 'Fisika',
        yearOfExperience: 3,
        fee: 50000,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 2
      },
      {
        fullName: 'Morientes',
        field: 'Matematika',
        yearOfExperience: 5,
        fee: 100000,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 3
      },
      {
        fullName: 'Aquilani',
        field: 'Kimia',
        yearOfExperience: 1,
        fee: 40000,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 4
      },
    ];
    return queryInterface.bulkInsert('Teachers', data);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Teachers');
  }
};
