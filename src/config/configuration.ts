export default () => ({
  port: parseInt(process.env.PORT, 10) || 3002,
  mailerUser: process.env.MAILER_USER,
  alphaVantage: {
    key: process.env.ALPHAVANTAGE_KEY,
    changeKeyStr: process.env.ALPHAVANTAGE_CHANGE_KEY_STR,
  },
  database: {
    dialect: process.env.DATABASE_DIALECT,
    name: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5438,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
});
