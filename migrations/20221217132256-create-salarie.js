'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('salaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'employees',
          },
          key: 'id'
        },
      },
      month: {
        type: Sequelize.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12')
      },
      year: {
        type: Sequelize.STRING
      },
      total_working_days: {
        type: Sequelize.INTEGER
      },
      total_leave_taken: {
        type: Sequelize.INTEGER
      },
      overtime: {
        type: Sequelize.DATE
      },
      total_salary_made: {
        type: Sequelize.FLOAT
      },
      Is_salary_calculated: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('salaries');
  }
};