'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserDetail.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  UserDetail.init({
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'fullName cannot be empty' }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'phoneNumber cannot be empty' }
      }
    },
    UserId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'UserId cannot be empty' }
      }
    },
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};