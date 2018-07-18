import Sequelize from 'sequelize';
// const sequelize = new Sequelize('database', 'username', 'password');
const sequelize = new Sequelize('postgres://postgres:123456@127.0.0.1:5432/node-db-postgres');
// const sequelize = new Sequelize('node-db-postgres', 'postgres', '123456', {
//   host: 'localhost',
//   dialect: 'postgres',
//   operatorsAliases: false,

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
// });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  export default sequelize;

// const models = {
//   user: sequelize.import('../models/user'),
// };

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// models.sequelize = sequelize;
// models.Sequelize = Sequelize;

// export default models;