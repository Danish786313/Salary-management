'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class salarie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.employee, { foreignKey : 'employee_id'})
    }
  }
  salarie.init({
    employee_id: DataTypes.INTEGER,
    month: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'),
    year: DataTypes.STRING,
    total_working_days: DataTypes.INTEGER,
    total_leave_taken: DataTypes.INTEGER,
    overtime: DataTypes.DATE,
    total_salary_made: DataTypes.FLOAT,
    Is_salary_calculated: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'salarie',
  });
  return salarie;
};