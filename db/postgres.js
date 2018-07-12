import Sequelize from 'sequelize';
// const sequelize = new Sequelize('database', 'username', 'password');
const sequelize = new Sequelize('postgres://user:postgres:5432/node-db-postgres');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });