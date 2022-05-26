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
      UserTeacher.belongsTo(models.Teacher, { foreignKey: "TeacherId" });
      UserTeacher.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  UserTeacher.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Date cannot be empty' },
        notNull: { msg: 'Date cannot be null' },
        isDateValid(value) {
          // console.log(value);
          if (value) {
            let dateNow = new Date().getDate();
            let dateAppointment = value.getDate();
            if (dateAppointment < dateNow) {
              // console.log('here');
              throw new Error('Date is already passed');
            }
          }
        }
      }
    },
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    TeacherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserTeacher',
    hooks: {
      beforeCreate(UserTeacher) {
        UserTeacher.rating = null;
        UserTeacher.status = 'pending';
      }
    }
  });
  return UserTeacher;
};