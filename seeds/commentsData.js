const { Comments } = require('../models');

const commentsdata = [
  {
    description: 'Blossoming Apricot',
    username: 'LedyX',
    posting_date: '07/28/2023',
    post_id: 1,
  },
  {
    description: 'MVP is great',
    username: 'alvarezrz',
    posting_date: '07/28/2023',
    post_id: 2,
  },
  
];

const seedComments = () => Comments.bulkCreate(commentsdata);

module.exports = seedComments;
