const { Thought, User, Reaction } = require('../models');

module.exports = {
  // Get all thoughts
  async getThought(req, res) {
    try {
      const thought = await Thought.findOne({_id: req.params.thoughtId})
      .select('-__v');
      if(!thought) {
        return res.status(404).json({ message: 'No one thought that'});
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought - Thinking a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
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
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
// Evolve a thought
async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        {_id:req.params.thoughtId},
        {$set: req.body},
        {runValidators:true}
      );
      if(!thought) {
        res.status(404).json({ message: 'No User thought that'});
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
},
// Forget a thought

    async deleteThought(req, res) {
      try {
          const thought = await Thoughts.findOneAndDelete({_id:req.params.thoughtId});

          if (!thought) {
              res.status(404).json({ message: 'No thought with that ID' });
          }
          res.json({ message: 'Thought deleted!' });
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
          { runValidators: true}
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
      const reaction = await Reaction.findOneAndDelete(
        { _id: req.params.reactionId },
        {$pull: {Reaction: {reactionId: req.params.reactionId}}},
        {runValidators: true}
        );

      if (!reaction) {
        return res.status(404).json({ message: 'Someone took back that reaction' });
      }

      await Reaction.deleteMany({ _id: { $in: reaction.user } });
      res.json({ message: 'reaction and user deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

};
module.exports = thoughtController;