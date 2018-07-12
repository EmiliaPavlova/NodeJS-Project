import sequelize from 'sequelize';

const Product = sequelize.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.REAL
  },
});

// force: true will drop the table if it already exists
Product.sync({force: true}).then(() => {
  // Table created
  return Product.create({
    name: 'Product',
    price: 0.5
  });
});
