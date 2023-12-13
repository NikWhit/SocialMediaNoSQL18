const mongoose = require('mongoose');
const reactionSchema = require('./Reaction');

//Schema for what makes up a thought
const thoughtSchema = new mongoose.Schema(
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
        default: Date.now,
    },
//The username that created the thought
    username: [
        {
            type: string,
            required: true,
        }],
//Array dof nested docs created with the reactionSchema
    reactions: [reactionSchema],
},
{
        toJSON: {
            virtual: true,
            getters: true,
        },
        });
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reaction.length;    
});

const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;

