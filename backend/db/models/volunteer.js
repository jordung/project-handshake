"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Volunteer extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsTo(models.target_comm);
    }
  }
  Volunteer.init(
    {
      userId: DataTypes.INTEGER,
      targetCommId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "volunteer",
      underscored: true,
    }
  );
  return Volunteer;
};
