module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: DataTypes.DECIMAL
  });
  Product.associate = (models) => {
    // associations can be defined here
  };
  return Product;
};