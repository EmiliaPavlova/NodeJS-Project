import Sequelize from 'sequelize';

const sequelize = new Sequelize('node-db-postgres', 'postgres', '123456');
const models = {
  user: sequelize.import('./users'),
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;

// https://www.youtube.com/watch?v=BpEw1PNdvkg
