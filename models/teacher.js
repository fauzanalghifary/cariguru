'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Teacher.belongsToMany(models.User, { through: models.UserTeacher });
      Teacher.hasOne(models.UserTeacher, { foreignKey: "TeacherId" });
      Teacher.belongsTo(models.User, { foreignKey: "UserId" });
    }

    formatRupiah() {
      return this.fee.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
    }

    static getTeacherByField(field, sort) {
      let option = {};
      if (field) {
        option.where = {
          field: field
        };
      }

      if (sort === 'fee') {
        option.order = [['fee', 'ASC']];
      }

      if (sort === 'experience') {
        option.order = [['yearOfExperience', 'DESC']];
      }


      return Teacher.findAll(option);
    }
  }
  Teacher.init({
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'fullName cannot be empty' }
      }
    },
    field: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'field cannot be empty' },
      },

    },
    yearOfExperience: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: { msg: 'yearOfExperience cannot be empty' }
      }
    },
    fee: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: { msg: 'fee cannot be empty' }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: { msg: 'UserId cannot be empty' }
      }
    },
  }, {
    sequelize,
    modelName: 'Teacher',
  });
  return Teacher;
};