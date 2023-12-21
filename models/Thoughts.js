const mongoose = require('mongoose');
const moment = require('moment');
const reactionsSchema = require('./Reactions');

//Schema for what makes up a thought
const thoughtsSchema = new mongoose.Schema(
    {
//Content and criteria for the ThoughtSchema
    thoughtText: {
        type: String,
        required: true,
        minLength: 15,
        maxLength: 280,
    },
//This is the timestamp of the createdAt date
      createdAt: {
        type: Date,
        default: moment(),
        get: (date) => moment(date).format('MM/DD/YYYY hh:mm:ss a')
    },
//The username that created the thought
    username: [
        {
            type: String,
            required: true,
        }],
//Array dof nested docs created with the reactionSchema
    reactions: [reactionsSchema]
},
{
        toJSON: {
            virtual: true,
            getters: true,
        },
        id: false,
        });
thoughtsSchema.virtual('reactionCount')
.get(function() {
    return this.reaction.length;    
});

const Thoughts = mongoose.model('thoughts', thoughtsSchema);
module.exports = Thoughts;

