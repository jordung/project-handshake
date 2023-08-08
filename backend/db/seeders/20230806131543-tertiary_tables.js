"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("volunteers", [
      {
        user_id: 1,
        target_comm_id: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 4,
        target_comm_id: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 5,
        target_comm_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    await queryInterface.bulkInsert("projects", [
      {
        user_id: 3,
        target_comm_id: 3,
        title: "Stray Animal Rescue and Relocation",
        description:
          "Assist in rescuing stray animals in distress and relocating them to safer areas or shelters.",
        location: "Singapore",
        start_date: "2024-02-02T10:00:00.000Z",
        end_date: "2024-02-02T12:00:00.000Z",
        volunteers_required: "3",
        image:
          "https://images.unsplash.com/photo-1553434133-96822a8e94af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1465&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 2,
        target_comm_id: 1,
        title: "Grocery Shopping with Seniors",
        description:
          "Become a grocery shopping companion for our beloved seniors in the community. Join us in providing support and company to elderly individuals during their shopping trips. As a volunteer, you will accompany seniors to local grocery stores, help them navigate the aisles, and assist with carrying their shopping bags if needed. This simple act of kindness not only ensures that our seniors have access to essential supplies but also brightens their day with meaningful interactions and companionship.",
        location: "Singapore",
        start_date: "2023-10-10T10:00:00.000Z",
        end_date: "2023-10-10T12:00:00.000Z",
        volunteers_required: "2",
        image:
          "https://images.unsplash.com/photo-1675179181865-0f1b17e070d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    await queryInterface.bulkInsert("volunteer_projects", [
      {
        user_id: 1,
        project_id: 1,
        role_id: 3,
        status_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    await queryInterface.bulkInsert("liked_projects", [
      {
        user_id: 1,
        project_id: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    await queryInterface.bulkInsert("communications", [
      {
        user_id: 3,
        project_id: 1,
        title: "Getting to the venue",
        description:
          "Nearest MRT stop: Bendemeer MRT (Downtown Line). Take Exit B, and follow the escalator until you see Bendemeer Market. Once you see the market, take a right and you will see this huge sheltered foyer area, which will be our meet-up point.",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    await queryInterface.bulkInsert("comments", [
      {
        user_id: 1,
        communication_id: 1,
        text: "Can I check if slippers will be allowed?",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 3,
        communication_id: 1,
        text: "Hey John! Sorry, but only covered shoes will be allowed at this event.",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("comments");
    await queryInterface.bulkDelete("communications");
    await queryInterface.bulkDelete("liked_projects");
    await queryInterface.bulkDelete("volunteer_projects");
    await queryInterface.bulkDelete("projects");
    await queryInterface.bulkDelete("volunteers");
  },
};
