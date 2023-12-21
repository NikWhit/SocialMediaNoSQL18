const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtsController.js');

// /api/thoughtRoutes


// /api/thoughtRoutes/:thoughtId
router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(createReaction)
router.route('/:thoughtId/reactions/:reactionsId').deleteReaction;

module.exports = router;
