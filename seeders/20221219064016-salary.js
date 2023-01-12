'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('salaries', [{
        employee_id: 1,
        month: 12,
        year : 2022,
        total_working_days: 28,
        total_leave_taken : 2,
        overtime: 2,
        total_salary_made : 1456.5,
        Is_salary_calculated: null
      }], {});
    },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('salaries', null, {});
  }
};
