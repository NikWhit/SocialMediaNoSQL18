const mongoose = require('mongoose');

// Schema to create user model
const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
  
    email: { 
      type: String,
      required: true,
      unique: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    },
      Thought: [{ 
          type: mongoose.Schema.Types.ObjectId,
          ref: 'thoughts'
        }],
      Friends: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
      }],
    },
  {
    toJSON: {
      virtual: true,
    },
      id: false,
  }
);

usersSchema.virtual('friends')
.get(function() {
  return this.friends.length
});

const Users = mongoose.model('users', usersSchema);

module.exports = Users;
