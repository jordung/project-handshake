"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Communication extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsTo(models.project);
      this.hasMany(models.comment);
    }
  }
  Communication.init(
    {
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "communication",
      underscored: true,
    }
  );
  return Communication;
};
