'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    let data = [
      {
        status: 'pending',
        date: new Date('27 May 2022'),
        UserId: 5,
        TeacherId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 'pending',
        date: new Date('27 May 2022'),
        UserId: 6,
        TeacherId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 'pending',
        date: new Date('28 May 2022'),
        UserId: 6,
        TeacherId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ];
    return queryInterface.bulkInsert('UserTeachers', data);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserTeachers');
  }
};
