'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('Users', {
       id: {
         type: Sequelize.INTEGER,
         allowNull: false,
         autoIncrement: true,
         unique: true,
         primaryKey: true
       },
       firstName: {
         type: Sequelize.STRING,
       },
       email: {
         type: Sequelize.STRING,
         unique: true,
         allowNull: false
       },
       password: {
         type: Sequelize.STRING,
         allowNull: false
       },
       isActive: {
         type: Sequelize.BOOLEAN,
         allowNull: false,
         defaultValue: true
       }
     });
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.dropTable('Users');

  }
};
