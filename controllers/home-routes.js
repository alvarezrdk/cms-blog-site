const router = require('express').Router();
const { Post, Comments } = require('../models');
const { dateFormat } = require('../utils/helpers');


const formatDate = (date) => {
  const options = { month: 'long', day: 'numeric', year: 'numeric'};
  return new Intl.DateTimeFormat('en-US', options).format(date);
};


// GET all galleries for homepage
router.get('/', async (req, res) => {
  
  try {
    const dbPostData = await Post.findAll({
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

router.get('/newpost', (req, res) => {
  // If the user is already logged in, render newPost
  if (req.session.loggedIn) {
    res.render('newpost');
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

// Logout
router.post('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/dashboard', async (req, res) => {
  //console.log(req.session.username);

  if (req.session.loggedIn) {
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
} else { 
      res.render('login')
    }
  }
  );

router.post('/savepost', async (req, res) => {
  console.log(req.session.username);
  console.log(req.body.tittle)

  const date = new Date();
  const formattedDate = formatDate(date);
  

  try {
    const dbPostData = await Post.create({
      title: req.body.tittle,
      description: req.body.description,
      posting_date: formattedDate,
      username: req.session.username
      })

    /// Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbPostData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
    });


module.exports = router;

module.exports = router;
