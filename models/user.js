module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};