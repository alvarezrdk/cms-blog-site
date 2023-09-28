const User = require('./User');
const Post = require('./Post');
const Comments = require('./Comments');

// Post.hasMany(Comments, {
//   foreignKey: 'id',
// });

// Comments.belongsTo(Post, {
//   foreignKey: 'post_id',
// });

module.exports = { User, Post, Comments };
