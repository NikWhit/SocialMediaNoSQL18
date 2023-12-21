const mongoose = require('mongoose');
const moment = require('moment');

const reactionsSchema = new mongoose.Schema(
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
      default: moment(),
      get: (date) => moment(date).format('MM?DD?YY hh:mm:ss a')
    }
  },
  {
      toJSON: {
        getters: true,
      },
      id:false,

  }
);

// const Reactions = mongoose.model('reactions', reactionsSchema);
module.exports = reactionsSchema;