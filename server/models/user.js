"use strict";
const { Model } = require("sequelize");
const { hashPass } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: { msg: "email must be unique" },
        allowNull: false,
        validate: {
          notEmpty: { msg: "email cannot be empty" },
          notNull: { msg: "email cannot be empty" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "password cannot be empty" },
          notNull: { msg: "password cannot be empty" },
        },
      },
      isSubscribed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((instance, opt) => {
    instance.password = hashPass(instance.password);
    instance.isSubscribed = false;
  });
  return User;
};
