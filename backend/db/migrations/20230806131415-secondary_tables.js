"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // SECONDARY TABLE FOR USERS
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      usertype_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "usertypes",
          key: "id",
        },
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      biography: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      location: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      profile_url: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // SECONDARY TABLE FOR ORGANISERS
    await queryInterface.createTable("organisers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      website: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("organisers");
    await queryInterface.dropTable("users");
  },
};
