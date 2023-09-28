const router = require('express').Router();
const { Post, Comments } = require('../models');

// GET all Post from logged User
router.get('/', async (req, res) => {
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

  const currentDate = new Date();
  const dateString = currentDate.toString();

  try {
    const dbPostData = await Post.create({
      title: req.body.tittle,
      description: req.body.description,
      posting_date: dateString,
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
