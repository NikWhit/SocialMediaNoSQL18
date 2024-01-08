const { Thought, User } = require('../models');

const thoughtController = {
  // I need to get all thoughts
  async getThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find()
      .sort({ createdAt: -1 });

      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought - Remembering a thought
  async getSingleThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId })

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought - Thinking a thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);
      const dbUserData = await User.findOneAndUpdate(
        {_id:req.body.userId},
        {$push: { thoughts: dbThoughtData._id }},
        {new: true}
        );
      
      if (!dbUserData) {
        return res.status(404).json({ message: 'Thought made but no user with id'});
      }
      res.json({ message: 'Thought has been made' });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

// Evolve a thought
async updateThought(req, res) {
  try {
    const dbThoughtData = await Thought.findOneAndUpdate(
      {_id:req.params.thoughtId},
      {$set: req.body},
      {runValidators:true, new:true}
    );

    if(!dbThoughtData) {
      res.status(404).json({ message: 'No thought with that ID'});
    }
    res.json(dbThoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
},


// Forget a thought

    async deleteThought(req, res) {
      try {
          const dbThoughtData = await Thought.findOneAndDelete({_id:req.params.thoughtId});

          if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought with that ID' });
          }
    const dbUserData = User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params,thoughtId } },
      { new: true }
    );
    if (!dbUserData) {
      return res.status(404).json({ message: 'thought made but no user with that id.'});
    }
          res.json({ message: 'Thought Forgotten!' });
      } catch (err) {
          res.status(500).json(err);
      }
  },


// Creating a reaction
async addReaction(req, res) {
  try {
      const dbThoughtData = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true}
        );
  
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(dbThoughtData);
  } catch (err) {
      res.status(500).json(err);
  }
},

  // Delete a Reaction
  async removeReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId },
        {$pull: {Reaction: {reactionId: req.params.reactionId}}},
        {runValidators: true, new: true}
        );

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'Someone took back that reaction' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.export = thoughtController;
