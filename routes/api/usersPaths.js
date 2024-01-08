const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser, 
  updateUser, 
  deleteUser, 
  addFriend,
  // createNewFriend,
  // deleteFriend
  removeFriend
} = require('../../controllers/usersController');

// /api get and make user
router.route('/').get(getUsers).post(createUser);

// get user for update or delete
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
// get friend id. New friend, or old friend.
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
