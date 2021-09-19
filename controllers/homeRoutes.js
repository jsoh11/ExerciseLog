const router = require('express').Router();
const sequelize = require('../config/connection');
const { Exercise, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all exercises and JOIN with user data
    const exerciseData = await Exercise.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const exercises = exerciseData.map((exercise) =>
      exercise.get({ plain: true })
    );

    // Pass serialized data and session flag into template
    res.render('homepage', {
      exercises,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/exercise/:id/user/:user_id', withAuth, async (req, res) => {
  try {
    const exerciseData = await Exercise.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const exercisesData = await Exercise.findAll({
      where: {
        user_id: req.params.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const exercises = exercisesData.map((exercise) =>
      exercise.get({ plain: true })
    );
    const exercise = exerciseData.get({ plain: true });
    console.log(exercise);
    res.render('exercise', {
      ...exercise,
      exercises,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'],
      include: [
        [
          //grabbing user total distance and time from database
          sequelize.literal(
            '(SELECT SUM(distance) FROM exercise WHERE exercise.user_id = user.id)'
          ),
          'total_distance',
        ],
        [
          sequelize.literal(
            '(SELECT SUM(time) FROM exercise WHERE exercise.user_id = user.id)'
          ),
          'total_time',
        ],
      ], 
    },
      include: [{ model: Exercise }],
    });
    const user = userData.get({ plain: true });
    const exerciseData = await Exercise.findAll({ include: User });
    const exercises = exerciseData.map((exercise) =>
      exercise.get({ plain: true })
    );
    // console.log(exerciseData);
    // where the current user that is signed in grab their exercises and instead of mapping we
    // just want to grab the last exercise in the array of exercises for that user
    // const userExerciseData = await Exercise.
    const exerciseSolo = exerciseData[0];
    exerciseSolo.get({ plain: true });
    console.log(exercises);
    console.log('this is a solo exercise', exerciseSolo);
    // res.render('exercise', {
    //   exercises,
    //   logged_in: req.session.logged_in,
    // });
    res.render('profile', {
      ...user,
      ...exercises,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
