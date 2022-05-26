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
      User.hasOne(models.UserDetail, { foreignKey: "UserId" });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'username cannot be empty' }
      },
      unique: {
        args: true,
        msg: 'Username already in use!'
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'email cannot be empty' }
      },
      unique: {
        args: true,
        msg: 'Email already in use!'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'password cannot be empty' }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'role cannot be empty' }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'status cannot be empty' }
      }
    },
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