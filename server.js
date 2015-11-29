// Require our dependencies
var express = require('express')
var http = require('http')
var mongoose = require('mongoose')
var twitter = require('twitter')
var routes = require('./server/routes')
var config = require('./server/config')
var streamHandler = require('./server/streamHandler');
var CORS = require('cors')

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 3001;

// Disable etag headers on responses
app.disable('etag');
app.disable('x-powered-by');
app.options('*', CORS());
app.use(CORS())

// Connect to our mongo database
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/shopeeID-tweets');

// Create a new ntwitter instance
var twit = new twitter(config.twitter);

// Page Route
app.get('/page/:page/:skip', routes.page);

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/static/", { maxAge: 86400 }));

// Fire this bitch up (start our server)
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// Initialize socket.io
var io = require('socket.io').listen(server);

// Set a stream listener for tweets matching tracking keywords
twit.stream('statuses/filter',{ track: 'shopeeID'}, function (stream){
  streamHandler(stream, io);

});
