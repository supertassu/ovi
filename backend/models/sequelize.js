const path = require('path');
const Sequelize = require('sequelize');

const dbPath = path.resolve(__dirname, '..', 'save.db');

const sequelize = new Sequelize({
  logging: false,
  operatorsAliases: false,
  dialect: 'sqlite',
  storage: ':memory:',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected.');
  })
  .catch(err => {
    console.error('Unable to connect:', err);
  });

module.exports = sequelize;
