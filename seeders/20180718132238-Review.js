'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [{
      content: 'excellent',
      productId: '1'
    },
    {
      content: 'bla-bla',
      productId: '1'
    },
    {
      content: '***',
      productId: '2'
    }], {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Reviews', null, {})
};
