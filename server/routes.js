var Tweet = require('./models/Tweet');

module.exports = {

  page: function(req, res) {
    // Fetch tweets by page via param
    Tweet.getTweets(req.params.page, req.params.skip, function (tweets) {
      res.status(200).json(tweets)
    });
  }

}
