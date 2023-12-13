/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'Users';
const collection = 'SocialUsers';

// Create a new database.
use(database);

// Create a new collection.
db.createCollection(collection);

const userSchema = new mongoose.Schema(
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
        match: [/.+@.+\..+/, "Must match an email address!"],
      },
        Thought: [{ 
            type: Thought,
            ref: 'Thoughts'
          }],
        Friends: [{ 
          type: Types.ObjectId, 
          ref: 'Friends'
        }],
      },
    {
      toJSON: {
        virtual: true,
        getters: true,
      },
    }
  );
  
  userSchema.virtual('friendCount')
  .get(function() {
    return this.friends.length
  });
  
  const User = mongoose.model('user', userSchema);
  
  module.exports = User;
  

// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
