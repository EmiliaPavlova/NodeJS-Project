'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Mickey Mouse',
    },
    {
      name: 'John Doe',
    }], {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
