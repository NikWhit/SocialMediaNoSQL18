import { User, Thought } from require('../models');

const headCount = async ()=> {
    const numberOfUsers = await User.aggregate()
      .count('countUser');
      return numberOfUsers;
};

module.exports = {
  // Calling all users.
  async getUsers(req, res) {
      try {
        const users = await User.find()
        res.json(User);
        return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" });
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID, Try again!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a student and remove them from the course
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No such user exists, Please Try again' })
      }
    
//forget a thought

      const thought = await Thought.findOneAndUpdate(
        { user: req.params.userId },
        { $pull: { user: req.params.userId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          message: 'User deleted, forgot the thought',
        });
      }

      res.json({ message: 'User successfully deleted' });
    } 
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
    },
  // Update a user
  async updateUser(req,res) {
      try {
        const user = await User.findOneAndUpdate(
          {_id:req.params.userId},
          {$set: req.body},
          {runValidators:true}
        );
      if(!user) {
          res.status(404).json({message: 'No User known with that ID'});
      }
        res.jason(user);
    } catch (err) {
      res.status(500).json(err);
    }},
  
  //making friends
  async createNewFriend(req,res) {
    try {
      const user = await User.findOndAndUpdate(
        {_id: req.params.userID},
        {$addToSet:{friends:req.params.friendId}},
        {runValidators: true}
      );
      if(!user) {
        return res.status(404).json({message: 'No User know by that ID'});
      }
        res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
    },
  
  // Adding thoughts to a user
  async addThought(req, res) {
    try {
      console.log('You are adding a thought');
      console.log(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' })
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove thought from a user
  async removeUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: {friend: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = userController;