require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || 'localhost',
    // port: process.env.DB_PORT,
    dialect: 'mysql',
  },
  // test: {
  //   username: process.env.DB_USER,
  //   password: process.env.DB_PASS,
  //   database: 'database_test',
  //   host: process.env.DB_HOST,
  //   port: process.env.RDS_PORT,
  //   dialect: 'mysql',
  // },
  // production: {
  //   username: process.env.DB_USER,
  //   password: process.env.DB_PASS,
  //   database: 'database_production',
  //   host: process.env.DB_HOST,
  //   port: process.env.RDS_PORT,
  //   dialect: 'mysql',
  // },
};
