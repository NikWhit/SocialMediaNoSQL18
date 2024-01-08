const { User, Thought } = require('../models');

const userController = {
  // Calling all users.
  async getUsers(req, res) {
      try {
        const dbUserData = await User.find()
        .select('-__v')
        res.json(dbUserData);
        return res.status(200).json(dbUserData);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const dbUserData = await User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .populate('friends');
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with that ID, Try again!' });
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
 //Update a user dude! - Sorry its late and I'm getting punchy.
 async updateUser(req, res) {
  try{
    const dbUserData = await User.findOneAndUpdate(
      {_id:req.params.userId},
      {$set: req.body},
      {runValidators:true, new:true}
    );

    if (!dbUserData) {
      return res.status(404).json({message: 'No one here with that ID',});
    }
    res.json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
  },


  // Delete a user
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });
      if (!dbUserData) {
        return res.status(404).json({ message: 'No such user exists, Please Try again' })
      }
    
//"forget" a thought

      await Thought.deleteMany({_id:{ $in: dbUserData.thoughts }});
      res.json({ message: 'User and their thoughts are gone'});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //making friends
  async addFriend(req,res) {
    try {
      const dbUserData = await User.findOndAndUpdate(
        {_id: req.params.userID},
        {$addToSet:{friends:req.params.friendId}},
        {runValidators: true}
      );
      if(!dbUserData) {
        return res.status(404).json({message: 'No User known by that ID'});
      }
        res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
    },
  
  // // Adding thoughts to a user
  // async addThought(req, res) {
  //   try {
  //     console.log('You are adding a thought');
  //     console.log(req.body);
  //     const user = await Users.findOneAndUpdate(
  //       { _id: req.params.userId },
  //       { $addToSet: { thoughts: req.body } },
  //       { runValidators: true, new: true }
  //     );

  //     if (!user) {
  //       return res
  //         .status(404)
  //         .json({ message: 'No user found with that ID :(' })
  //     }

  //     res.json(user);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },

  // Burning Bridges
  async removeFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: {friends:req.params.friendId } } ,
        { new: true }
      );

      if (!dbUserData) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

  module.exports = userController;
