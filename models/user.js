'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.belongsToMany(models.Teacher, { through: models.UserTeacher });
      User.hasOne(models.UserTeacher, { foreignKey: "UserId" });
      User.hasOne(models.Teacher, { foreignKey: "UserId" });
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, option) => {
        user.password = bcrypt.hashSync(user.password);
      }
    }
  });
  return User;
};