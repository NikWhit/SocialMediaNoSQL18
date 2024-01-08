const { Schema, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
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
module.exports = reactionSchema;