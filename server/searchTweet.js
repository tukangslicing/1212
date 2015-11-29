var Tweet = require('./models/Tweet');
var CronJob  = require('cron').CronJob;
var async = require('async')
var _ = require('lodash')

module.exports = function(twit){

  var Job = new CronJob('*/30 * * * * *', function() {

    async.waterfall([
      function (callback) {
        twit.get('search/tweets', {q: '#ShopeeID', result_type: 'recent'}, function(error, tweets, response) {

          if (error) {
            callback(error, null)
          } else {
            var data = _.map(tweets.statuses, function(status) {
              var obj = {
                  twid: status['id_str'],
                  screenname: status['user']['screen_name'],
                  author: status['user']['name'],
                  avatar: status['user']['profile_image_url_https'].replace(/_normal/, ''),
                  body: status['text'],
                  date: status['created_at'],
                  tweet_link: ["https://twitter.com/", status['user']['screen_name'], "/status/", status['id_str']].join(''),
                  active: true
                };
              return obj
            })

            callback(null, data)
          }

        });
      },
      function (tweets, callback) {

        if (tweets) {
          var saveTweet = function(tw, cb) {

            var newTweet = new Tweet(tw)

            newTweet.save(function (err, succes) {
              // if (succes) {
              //   console.log(succes._id)
              // }
              cb()
            })
          };

          async.eachSeries(tweets, saveTweet, function (err) {

            callback(null, tweets)
          })

        } else {
          callback(null, null)
        }
      }
    ], function (err, result) {

    })

  }, null, true, "Asia/Jakarta");
}
