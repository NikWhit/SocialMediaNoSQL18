const { Users, Thoughts } = require('../models');

module.exports = {
  // Calling all users.
  async getUsers(req, res) {
      try {
        const users = await Users.find()
        res.json(users);
        return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await Users.findOne({ _id: req.params.userId })
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
      const user = await Users.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await Users.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No such user exists, Please Try again' })
      }
    
//"forget" a thought

      await Thoughts.deleteMany({_id:{$in:user.thoughts}});
      res.json({ message: 'User and their thoughts are gone'});
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Update a user dude!
  async updateUser(req, res) {
    try{
      const user = await Users.findOneAndUpdate(
        {_id:req.params.userId},
        {$set: req.body},
        {runValidators:true, new:true}
      );

      if (!user) {
        return res.status(404).json({message: 'One one here with that ID',});
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
    },

  // Update a user
  async updateUser(req,res) {
      try {
        const user = await Users.findOneAndUpdate(
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
  async addFriend(req,res) {
    try {
      const user = await Users.findOndAndUpdate(
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
      const user = await Users.findOneAndUpdate(
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
  async removeFriend(req, res) {
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: {friends:req.params.friendId } } ,
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
