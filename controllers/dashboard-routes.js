const router = require('express').Router();
const { Post, Comments } = require('../models');

// GET all Post from logged User
router.get('/', async (req, res) => {
  //console.log(req.session.username);
  try {
    const dbPostData = await Post.findAll({
      where: {
        username: req.session.username
      }
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/newPost', async (req, res) => {
  //console.log(req.session.username);
  try {
    const dbPostData = await Post.create({
      tittle: req.body.tittle,
      description: req.body.description,
      posting_date: new Date(),
      })

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;
