require('@babel/register');
const db = require('./models/sequelize');
const app = require('./app');

db.sync()
    .then(() => app.listen(process.env.PORT || 3000));

