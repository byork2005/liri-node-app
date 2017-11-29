// variables and requires
var twitterKeys = require('./keys.js');
var Twitter = require('twitter');
var client = new Twitter (twitterKeys);
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

var spotify = new Spotify({
  id: '2659e7f192d0460488f8103f2f001151',
  secret: 'bc20fcde3edb44978fd3cd9193a6abc7'
});

var input = process.argv;

// Initial commands and switch options for them
console.log("Try these commands! \nmy-tweets \nspotify-this-song '<song name here>' \nmovie-this '<movie name here>' \ndo-what-it-says \r\n--------------------------\r\n")

switch(input[2]) 
{
  case "my-tweets":
    tweets();
    break;
  case "spotify-this-song":
    musicSearch(input[3]);
    break;
  case "movie-this":
    movieSearch(input[3]);
    break;
  case "do-what-it-says":
    readRandomTxt();
}

// twitter function
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
          var tweetResults = "Tweet " + (i+1) + ": " + tweets[i].text + "\r\nPosted: " + tweets[i].created_at + "\r\n--------------------------\r\n";
          console.log(tweetResults);
          log(tweetResults);
        };
      } else ("something went wrong pulling from Twitter")
    });
}

// spotify function
function musicSearch(song)
{
  if(!song) {song = "One is the loneliest number"}
  spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) 
  {
    if (err) 
    {
      console.log("error" + err);
    } else {
      var songInfo = data.tracks.items[0];
      
          if (songInfo != undefined) {
              var songResults =
              "Artist: " + songInfo.artists[0].name + "\r\n" +
              "Song: " + songInfo.name + "\r\n" +
              "Album: " + songInfo.album.name + "\r\n" +
              "Preview Url: " + songInfo.preview_url + 
              "\r\n--------------------------\r\n"
              console.log(songResults);
              log(songResults);
          }
    }
  });
};

// omdb function
function movieSearch(title)
{
  if(!title) {title = "Mr. Nobody"}
  var queryURL = "http://www.omdbapi.com/?t=" + title + "&plot=full&tomatoes=true&apikey=trilogy&"
  request(queryURL, function(error, response, body)
  {
    if (!error && response.statusCode === 200)
    {
      var movie = JSON.parse(body);
      var movieResults = "Title: " + movie.Title + "\r\nYear: " + movie.Year + "\r\nIMDB Rating: " + movie.imdbRating +
      "\r\nRotten Tomatoes Rating: " + movie.tomatoMeter + "\r\nCountry: " + movie.Country + "\r\nLanguage: " +
      movie.Language + "\r\nStarring: " + movie.Actors + "\r\nPlot: " + movie.Plot + "\r\n--------------------------\r\n"
      console.log(movieResults);
      log(movieResults);
    }
  })
}

// read random.txt function
function readRandomTxt()
{
  fs.readFile("random.txt", "utf8", function(err, data)
  {
    if(err)
    {
      console.log("Error: " + err)
    } else {
      var splitText = data.split(",");
      musicSearch(splitText[1]);
    }
  })
}

// logs all the outputs to log.txt
function log(text)
{
  fs.appendFile("log.txt", text, function(err)
  {
    if(err)
    {
      console.log("Error during log: " + err);
    }
  })
}