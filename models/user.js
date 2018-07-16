// // import Sequelize from 'sequelize';
// import sequelize from '../db/postgres';
// console.log(sequelize);

// const User = sequelize.define('user', {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// // force: true will drop the table if it already exists
// User.sync({force: true}).then(() => {
//   // Table created
//   return User.create({
//     name: 'Mickey Mouse',
//   });
// });
