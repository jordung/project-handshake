"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // TERTIARY TABLE FOR VOLUNTEERS
    await queryInterface.createTable("volunteers", {
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
      target_comm_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "target_comms",
          key: "id",
        },
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

    // TERTIARY TABLE FOR PROJECTS
    await queryInterface.createTable("projects", {
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
      target_comm_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "target_comms",
          key: "id",
        },
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      end_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      volunteers_required: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      image: {
        allowNull: false,
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

    // TERTIARY TABLE FOR VOLUNTEER_PROJECTS
    await queryInterface.createTable("volunteer_projects", {
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
      project_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "projects",
          key: "id",
        },
      },
      role_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "roles",
          key: "id",
        },
      },
      status_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "statuses",
          key: "id",
        },
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

    // TERTIARY TABLE FOR LIKED_PROJECTS
    await queryInterface.createTable("liked_projects", {
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
      project_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "projects",
          key: "id",
        },
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

    // TERTIARY TABLE FOR COMMUNICATIONS
    await queryInterface.createTable("communications", {
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
      project_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "projects",
          key: "id",
        },
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
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

    // TERTIARY TABLE FOR COMMENTS
    await queryInterface.createTable("comments", {
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
      communication_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "communications",
          key: "id",
        },
      },
      text: {
        allowNull: false,
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
    await queryInterface.dropTable("comments");
    await queryInterface.dropTable("communications");
    await queryInterface.dropTable("liked_projects");
    await queryInterface.dropTable("volunteer_projects");
    await queryInterface.dropTable("projects");
    await queryInterface.dropTable("volunteers");
  },
};
