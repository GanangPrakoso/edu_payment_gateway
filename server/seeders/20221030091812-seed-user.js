"use strict";

const { hashPass } = require("../helpers");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "user1@mail.com",
          password: hashPass("user1"),
          isSubscribed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "user2@mail.com",
          password: hashPass("user2"),
          isSubscribed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
