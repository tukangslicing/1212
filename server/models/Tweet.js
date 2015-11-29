var mongoose = require('mongoose');

// Create a new schema for our tweet data
var schema = new mongoose.Schema({
    twid       : {
      unique: true,
      type: String,
      require: true,
      trim: true,
    },
    active     : Boolean,
    author     : String,
    avatar     : String,
    body       : String,
    date       : Date,
    screenname : String,
    tweet_link : String
});

// Create a static getTweets method to return tweet data from the db
schema.statics.getTweets = function(pages, skip, callback) {

  var limit = 15
  var page = parseInt(pages) || 1
  var offset = (page > 1) ? (page - 1) * limit : 0;

  // Query the db, using skip and limit to achieve page chunks
  Tweet
    .find({},'twid active author avatar body date screenname')
    .sort({date: 'desc'})
    .limit(limit)
    .skip(offset)
    .exec(function (err, tweets){
    // Pass them back to the specified callback
    callback(tweets);
  });

};

// Return a Tweet model based upon the defined schema
module.exports = Tweet = mongoose.model('Tweet', schema);
