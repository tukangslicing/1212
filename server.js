// Require our dependencies
var express = require('express')
var http = require('http')
var mongoose = require('mongoose')
var twitter = require('twitter')
var routes = require('./server/routes')
var config = require('./server/config')
var compression = require('compression');
var CORS = require('cors')

var MONGODB_URL = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/shopeeID-tweets'

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 3001;

// Connect to our mongo database
mongoose.connect(MONGODB_URL);

// Disable etag headers on responses
app.disable('etag');
app.disable('x-powered-by');
app.options('*', CORS());
app.use(CORS())

if (process.env.NODE_ENV === 'production') {
  app.use(compression({
    filter: function (req, res) { return /json|html|text|javascript|css|less/.test(res.getHeader('Content-Type')) },
    level: 9
  }))
}

// Create a new ntwitter instance
// Page Route
app.get('/page/:page/:skip', routes.page);

// app.get('/tweet', function (req, res) {
//   var twit = new twitter(config.twitter);
//   twit.get('search/tweets', {q: '#Shopee1212', result_type: 'recent'}, function(error, tweets, response) {

//     res.send(tweets)

//   })
// })

app.use("/", express.static("./static/", { maxAge: 86400 }));
app.use("/1212/", express.static("./static/", { maxAge: 86400 }));

require('./server/searchTweet')(twit)

app.listen(port, function () {
  console.log('Express server listening on port ' + port)
});

// Initialize socket.io
// var io = require('socket.io').listen(server);

// // Set a stream listener for tweets matching tracking keywords
// twit.stream('statuses/filter',{ track: 'shopeeID'}, function (stream) {
//   if (stream) {
//     streamHandler(stream, io);
//   }
// });
