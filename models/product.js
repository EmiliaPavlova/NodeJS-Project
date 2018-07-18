module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: DataTypes.DECIMAL
  });
  Product.associate = (models) => {
    Product.hasMany(models.Review, {
      foreignKey: 'productId',
      as: 'reviews',
    });
  };
  return Product;
};