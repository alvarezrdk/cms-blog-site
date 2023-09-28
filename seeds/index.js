const sequelize = require('../config/connection');
const seedPost = require('./postData');
const seedComments = require('./commentsData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedPost();

  await seedComments();

  process.exit(0);
};

seedAll();
