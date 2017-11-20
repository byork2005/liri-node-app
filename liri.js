var twitterKeys = require('./keys.js');
var Twitter = require('twitter');
var client = new Twitter (twitterKeys);
var spotify = require('node-spotify-api');
var request = require('request');

var input = process.argv;
console.log(input);

tweets();

function tweets() {
    var params = {screen_name: 'by_test2017'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log("Yay!");
        console.log(tweets.length);
        console.log(tweets[0].text);
        console.log(tweets[0].created_at);
      } else ("something went wrong")
    });
}

