'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.salarie, { foreignKey : 'employee_id'})
    }
  }
  employee.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.INTEGER,
    address: DataTypes.STRING,
    basesalary: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'employee',
  });
  return employee;
};