"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usertype extends Model {
    static associate(models) {
      this.hasMany(models.user);
    }
  }
  Usertype.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "usertype",
      underscored: true,
    }
  );
  return Usertype;
};
