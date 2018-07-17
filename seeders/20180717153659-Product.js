module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: 'Product 1',
      price: 10.5
    },
    {
      name: 'Product 2',
      price: 8.25
    },
    {
      name: 'Product 3',
      price: 5.99
    }], {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Products', null, {})
};
