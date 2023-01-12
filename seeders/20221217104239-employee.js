'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('employees', [{
        name: 'Danish Ahmad Khan',
        email: 'danish@kolonizer.com',
        mobile: 1234567890,
        address: '404 bhopal',
        basesalary: 20000
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees', null, {});
  }
};
