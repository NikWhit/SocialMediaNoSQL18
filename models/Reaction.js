const mongoose = require('mongoose');

const reactionSchema = new mongoose.modelSchema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
      toJSON: {
        getters: true,
      },
  },
{
  id:false,
}
);

module.exports = reactionSchema;