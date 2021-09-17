const router = require('express').Router();
const { Exercise, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const exerciseData = await Exercise.findAll({include:User});
    const exercises = exerciseData.map(exercise => exercise.get({ plain: true }));
   console.log(exercises)
    res.render('exercise', {
      exercises,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  } 
 });

 router.get('/', async (req, res) => {
  try {
    const exerciseData = await Exercise.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const exercises = exerciseData.map((exercise) => exercise.get({ plain: true }));

    res.render('homepage', { 
      exercises, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
  try {
    const newExercise = await Exercise.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newExercise);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const exerciseData = await Exercise.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!exerciseData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
