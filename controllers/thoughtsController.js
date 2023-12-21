const { Reactions, Thoughts, Users } = require('../models');

module.exports = {
  // I need to get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought - Thinking a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thoughts.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No course with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thoughts.create(req.body);
      const user = await Users.findOneAndUpdate(
        {_id:req.body.userId},
        { $addToSet: { thoughts: thought._id}},
        )
      
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

// Forget a thought

    async deleteThought(req, res) {
      try {
          const thought = await Thoughts.findOneAndDelete({_id:req.params.thoughtId});

          if (!thought) {
              res.status(404).json({ message: 'No thought with that ID' });
          }
          res.json({ message: 'Thought Forgotten!' });
      } catch (err) {
          res.status(500).json(err);
      }
  },

// Evolve a thought
async updateThought(req, res) {
  try {
    const thought = await Thoughts.findOneAndUpdate(
      {_id:req.params.thoughtId},
      {$set: req.body},
      {runValidators:true, new:true}
    );

    if(!thought) {
      res.status(404).json({ message: 'No thought with that ID'});
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
},

// Creating a reaction
async createReaction(req, res) {
  try {
      const thought = await Thoughts.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true}
        );
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
  } catch (err) {
      res.status(500).json(err);
  }
},

  // Delete a Reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thoughts.findOneAndDelete(
        { _id: req.params.thoughtId },
        {$pull: {Reaction: {reactionId: req.params.reactionId}}},
        {runValidators: true, new: true}
        );

      if (!thought) {
        return res.status(404).json({ message: 'Someone took back that reaction' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }

}