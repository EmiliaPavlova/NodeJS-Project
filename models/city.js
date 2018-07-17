module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    capital: DataTypes.BOOLEAN,
    // location: DataTypes.OBJECT
  });
  City.associate = (models) => {
    // associations can be defined here
  };
  return City;
};