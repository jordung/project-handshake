"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Organiser extends Model {
    static associate(models) {
      this.belongsTo(models.user);
    }
  }
  Organiser.init(
    {
      userId: DataTypes.INTEGER,
      website: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      sequelize,
      modelName: "organiser",
      underscored: true,
    }
  );
  return Organiser;
};
