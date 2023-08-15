"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        usertype_id: 1,
        name: "Johnathan Tan",
        username: "johnathantan",
        email: "johnathantan@mail.com",
        phone: "81127334",
        biography:
          "Animals hold a special place in my heart, and I'm on a mission to improve their lives. Whether it's volunteering at local shelters or advocating for animal rights, I believe in creating a world where every creature is treated with love and compassion. Let us volunteer together to make this world a better place.",
        location: "Singapore",
        profile_url:
          "https://images.unsplash.com/photo-1482235225574-c37692835cf3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        usertype_id: 1,
        name: "Jordan Ang",
        username: "jordung",
        email: "jordanayd@gmail.com",
        phone: "87006500",
        biography:
          "A firm believer in the strength of communities. I'm dedicated to creating spaces where everyone feels welcome and valued. Through volunteering, I aim to bridge gaps, foster inclusivity, and promote social change. Together, we can build a more harmonious society.",
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
        phone: "98007600",
        biography:
          "Our senior citizens deserve respect, care, and companionship. I'm dedicated to enriching the lives of the elderly through volunteer activities such as organising social gatherings, providing companionship, and assisting with everyday tasks.",
        location: "Singapore",
        profile_url:
          "https://lh3.googleusercontent.com/a/AAcHTte28tpNJMD7WK02Tpmc2nvZgmRYJ5i3cpxXknXbSawcYz6j=s461-c-no",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        usertype_id: 1,
        name: "Marilyn Doe",
        username: "marilyndoe",
        email: "marilyndoe@mail.com",
        phone: "98557655",
        biography:
          "The youth are our future, and I'm passionate about empowering them to reach their full potential. Through volunteering, I engage in mentorship programs, career guidance workshops, and leadership development initiatives to inspire and guide young leaders.",
        location: "Singapore",
        profile_url:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        usertype_id: 1,
        name: "Ethan Loh",
        username: "ethanloh",
        email: "ethanloh@mail.com",
        phone: "88559400",
        biography:
          "With a deep love for nature and a strong commitment to environmental conservation, I'm dedicated to making a positive impact on our planet. I've volunteered for various tree planting and clean-up initiatives, and I believe in the power of collective action for a greener future.",
        location: "Singapore",
        profile_url:
          "https://images.unsplash.com/photo-1511164194573-d3fc6e29e1ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxmZldURmppNnRad3x8ZW58MHx8fHx8&auto=format&fit=crop&w=1200&q=60",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        usertype_id: 1,
        name: "Olivia Jones",
        username: "oliviajones",
        email: "oliviajones@mail.com",
        phone: "97768511",
        biography:
          "Driven by a deep commitment to creating a world where every individual is celebrated for their unique abilities, I am dedicated to championing the rights and well-being of people with disabilities. Through volunteer work, I actively promote inclusivity, accessibility, and empowerment for this extraordinary community.",
        location: "Singapore",
        profile_url:
          "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        usertype_id: 2,
        name: "Harmony Community Services",
        username: "harmonycommunity",
        email: "harmonycommunity@mail.com",
        phone: "66554433",
        biography:
          "Harmony Community Services is dedicated to creating harmonious and inclusive communities through volunteer-driven initiatives that address social challenges, promote cultural diversity, and empower individuals of all backgrounds.",
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
        usertype_id: 3,
        name: "EmpowerAbility",
        username: "empowerability",
        email: "empowerability@mail.com",
        phone: "68809880",
        biography:
          "EmpowerAbility is dedicated to enhancing the lives of individuals with disabilities by providing resources, support, and advocacy for their inclusion and equal opportunities in all aspects of society.",
        location: "Singapore",
        profile_url:
          "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        usertype_id: 2,
        name: "Brighter Horizons Foundation",
        username: "brighterhorizons",
        email: "brighterhorizons@mail.com",
        phone: "69009600",
        biography:
          "At Brighter Horizons Foundation, we focus on empowering young people through mentorship, skills development, and leadership programs, enabling them to reach their full potential and become active contributors to society.",
        location: "Singapore",
        profile_url:
          "https://images.unsplash.com/photo-1531325082793-ca7c9db6a4c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        usertype_id: 3,
        name: "EcoGuardians Society",
        username: "ecoguardianssociety",
        email: "ecoguardianssociety@mail.com",
        phone: "65444456",
        biography:
          "EcoGuardians Society is committed to safeguarding our planet's ecological balance through concerted efforts in environmental education, advocacy, and conservation. By engaging communities and fostering a sense of responsibility, we strive to empower individuals to be conscientious stewards of the Earth, working together to create a sustainable and thriving world for present and future generations.",
        location: "Singapore",
        profile_url:
          "https://images.unsplash.com/photo-1492496913980-501348b61469?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);

    await queryInterface.bulkInsert("organisers", [
      {
        user_id: 7,
        website: "https://www.charities.gov.sg/",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 8,
        website: "https://spca.org.sg/",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 9,
        website: "https://www.sgenable.sg/",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 10,
        website: "https://www.beyond.org.sg/",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 11,
        website: "https://www.sec.org.sg/",
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
