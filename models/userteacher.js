'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTeacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserTeacher.init({
    rating: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    TeacherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserTeacher',
  });
  return UserTeacher;
};