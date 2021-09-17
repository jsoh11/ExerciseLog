const router = require('express').Router();
const { Exercise, User } = require('../../models');
const withAuth = require('../../utils/auth');


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
