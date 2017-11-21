var twitterKeys = require('./keys.js');
var Twitter = require('twitter');
var client = new Twitter (twitterKeys);
var spotify = require('node-spotify-api');
var request = require('request');

var input = process.argv;

function tweets() 
{
    var params = {screen_name: 'by_test2017'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) 
    {
      if (!error) 
      {
        var TwitLength = tweets.length;
        if(tweets.length > 20) 
        {
          TwitLength = 20
        };
        for(var i = 0; i < TwitLength; i++)
        {
          console.log("Tweet " + (i+1) + ": " + tweets[i].text);
          console.log("Posted: " + tweets[i].created_at);
        };
      } else ("something went wrong pulling from Twitter")
    });
}



