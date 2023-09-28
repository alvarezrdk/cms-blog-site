const { Post } = require('../models');

const postdata = [
  {
    title: 'CSS',
    description: 'Learning CSS',
    posting_date: 'July 28, 2023',
    username: 'alvarezrdk',
  },
  {
    title: 'MVP',
    description: 'Learning MVP',
    posting_date: 'July 28, 2023',
    username: 'alvarezrz',
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;
