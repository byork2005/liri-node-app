var twitterKeys = require('./keys.js');
var Twitter = require('twitter');
var client = new Twitter (twitterKeys);
var Spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify({
  id: '2659e7f192d0460488f8103f2f001151',
  secret: 'bc20fcde3edb44978fd3cd9193a6abc7'
});

var input = process.argv;

console.log("Try these commands! \nmy-tweets \nspotify-this-song '<song name here>' \nmovie-this '<movie name here>' \ndo-what-it-says")

if(input[2] == 'spotify-this-song')
{
  musicSearch(input[3]);
}

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

function musicSearch(song)
{
  spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) 
  {
    if (err) 
    {
      return console.log('Error occurred: ' + err);
    }
  
    // console.log(JSON.stringify(data, null, 2)); 
    console.log("Name: " + JSON.stringify(data.tracks.items, null, 2));
  });
};


// ID: 2659e7f192d0460488f8103f2f001151
// secret: bc20fcde3edb44978fd3cd9193a6abc7