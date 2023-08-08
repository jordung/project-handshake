"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        usertype_id: 1,
        name: "John Doe",
        username: "johndoe",
        email: "johndoe@mail.com",
        phone: "87654321",
        biography:
          "Skateboarder, coffee addict, audiophile, and avid graphic designer. Let us volunteer together to make this world a better place.",
        location: "Singapore",
        profile_url:
          "https://images.unsplash.com/photo-1482235225574-c37692835cf3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        usertype_id: 2,
        name: "Habitat For Humanity",
        username: "habitatforhumanity",
        email: "habitatforhumanity@mail.com",
        phone: "66554433",
        biography:
          "At Habitat for Humanity Singapore, we build decent homes across Asia-Pacific and rehabilitate flats in Singapore for vulnerable families.",
        location: "Singapore",
        profile_url:
          "https://images.unsplash.com/photo-1495653797063-114787b77b23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        usertype_id: 3,
        name: "HelpTheStrays",
        username: "helpthestrays",
        email: "helpthestrays@mail.com",
        phone: "60005000",
        biography:
          "Our mission is to rescue, rehabilitate, and find loving homes for stray and abandoned animals. Every animal deserves a chance at a happy and healthy life, and we work tirelessly to make that a reality.",
        location: "Singapore",
        profile_url:
          "https://images.unsplash.com/photo-1527424726923-52e678bdbc3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1626&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        usertype_id: 1,
        name: "Jordan Ang",
        username: "jordung",
        email: "jordanayd@gmail.com",
        phone: "88888888",
        biography: "I HATE MY MOUSE!",
        location: "Singapore",
        profile_url:
          "https://s.gravatar.com/avatar/ce29faa275702ae57595ad41c62d8a9a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjo.png",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        usertype_id: 1,
        name: "Jaelyn Teo",
        username: "jteohn",
        email: "jteohn@gmail.com",
        phone: "99999999",
        biography: "I LOVE MY MOUSE!",
        location: "Singapore",
        profile_url: "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);

    await queryInterface.bulkInsert("organisers", [
      {
        user_id: 2,
        website: "https://www.charities.gov.sg/",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 3,
        website: "https://spca.org.sg/",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("organisers");
    await queryInterface.bulkDelete("users");
  },
};
