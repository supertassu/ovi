const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const observation = sequelize.define('observation', {
  open: { type: Sequelize.BOOLEAN, default: false }
}, {
	timestamps: true
});

module.exports = observation;
