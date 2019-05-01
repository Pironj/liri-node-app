require("dotenv").config();

// get all our installed npm packages
var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var moment = require("moment");
var fs = require("fs");


var spotify = new Spotify(keys.spotify);

var spotifySearch = function (searchTerm) {
  if (searchTerm === "") {
    searchTerm = "The Sign by Ace of Base";
  }
  spotify.search({ 
    type: 'track', 
    query: searchTerm 
  },
  function(err, data) {
    if (err) {
      return console.log("Error occured: " + err);
    }
    // console.log(JSON.stringify(data, null, 2));

  var spotifySong = data.tracks.items;
  console.log(JSON.stringify(spotifySong[0].artists, null, 2));
  for (var i = 0; i < spotifySong.length; i++) {
    console.log("---------- Track Results for: " + searchTerm + " -----------")
    console.log("Artist(s): " + spotifySong[i].artists[0].name);
    console.log("Track Name: " + spotifySong[i].name);
    console.log("Preview URL: " + spotifySong[i].preview_url);
    console.log("Album: " + spotifySong[i].album.name);
    console.log("\n");
  }
  });
  // .catch(function(err) {
  //   console.log("Error: " + err);
  // });
}

// getBands axios function
var getBands = function(searchTerm) {
  if (searchTerm === "") {
    searchTerm = "Baby Shark";
  }
  axios
  .get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
  .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    var axiosData = response.data;
    // var location = axiosData[i].venue.city + ", " + axiosData[i].venue.region + ", " + axiosData[i].venue.country;
    for (var i = 0; i < axiosData.length; i++) {
    console.log("---------- Event Results for Artist/Band: " + searchTerm + " -----------")
    console.log("Venue Name: " + axiosData[i].venue.name);
    
      if (axiosData[i].venue.city === undefined) {
        console.log("Venue Location: " + axiosData[i].venue.country || axiosData[i].venue.region);
        console.log("Show Date: " + moment(axiosData[i].datetime).format("MM/DD/YYYY"));

      } else {
        console.log("Venue Location: " + axiosData[i].venue.city + ", " + axiosData[i].venue.region + ", " + axiosData[i].venue.country);
        console.log("Show Date: " + moment(axiosData[i].datetime).format("MM/DD/YYYY"));

      }
      console.log("\n");
    }
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      // console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log("Error", error.message);
    }
    // console.log(error.config);
  });
}

// get movie data function
var getMovie = function(searchTerm) {
  console.log(searchTerm);
  if (searchTerm === "") {
    searchTerm = "Mr Nobody";
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
    function(response) {
      var movieData = response.data;
      if (response) {
      console.log("---------- Results for Movie: " + searchTerm + " -----------")
      console.log("Title: " + movieData.Title);
      console.log("Release Year: " + movieData.Year);
      console.log("IMDB Rating: " + movieData.imdbRating);
      console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
      console.log("Country: " + movieData.Country);
      console.log("Language: " + movieData.Language);
      console.log("Plot: " + movieData.Plot);
      console.log("Actors: " + movieData.Actors);
      console.log("\n");
    }
  });
}

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    // console.log(data);
    splitData = data.split(",");
    // console.log(splitData);
    commands = splitData[0];
    noQuoteData = splitData[1].replace(/['"]+/g, '');
    searchTerm = noQuoteData;
    console.log(commands);
    console.log(searchTerm);

    liriBot(commands, searchTerm);
  });
};

console.log(keys);
var commands = process.argv[2];
console.log(commands)
var searchTerm = process.argv.slice(3).join(" ");
console.log(searchTerm);
liriBot(commands, searchTerm);

function liriBot() {
  if (commands === "concert-this") {
    getBands(searchTerm);
  }
  if (commands === "spotify-this-song") {
    spotifySearch(searchTerm);
  }
  if (commands === "movie-this") {
    getMovie(searchTerm);
  }
  if (commands === "do-what-it-says") {
    doWhatItSays();
  } 
  else {
    if (commands !== "concert-this" || commands !== "spotify-this-song" || commands !== "movie-this" || commands !== "do-what-it-says" || commands === undefined) {
      console.log("Not a recognized command by LIRI");
    }
  }
}