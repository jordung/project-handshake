"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("usertypes", [
      {
        name: "Volunteer",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: "Organisation",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: "Team",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    await queryInterface.bulkInsert("target_comms", [
      {
        name: "Seniors",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: "Youths",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: "Animals",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: "Environment",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: "People with Disabilities",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: "Others",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    await queryInterface.bulkInsert("roles", [
      {
        name: "Committee",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: "Facilitator",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: "Participant",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    await queryInterface.bulkInsert("statuses", [
      {
        name: "Pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: "Confirmed",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: "Rejected",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("statuses");
    await queryInterface.bulkDelete("roles");
    await queryInterface.bulkDelete("target_comms");
    await queryInterface.bulkDelete("usertypes");
  },
};
