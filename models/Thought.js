const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

//Schema for what makes up a thought
const thoughtSchema = new Schema(
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
    reactions: [reactionSchema]
},
{
        toJSON: {
            virtual: true,
            getters: true,
        },
        id: false,
        });
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;    
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;

