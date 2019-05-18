require("dotenv").config();

// get all our installed npm packages
var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var moment = require("moment");
var fs = require("fs");


var spotify = new Spotify(keys.spotify);
// JSON.stringify(data) ????
var loggingFun = function(data) {
  fs.appendFile("log.txt", data, function(err) {
    if (err) {
      console.log(err);
    }
  })
  console.log("Updated log.txt File");
}

var spotifySearch = function (searchTerm) {
  if (searchTerm === "") {
    searchTerm = "The Sign by Ace of Base";
  }
  // Passing command + search to write helper function above.
  var logCom = "\n\n\n\nLIRI BOT Command: " + commands + "\nSearched: " + searchTerm + "\n\n"
  loggingFun(logCom);
  
  // API call spotify
  spotify.search({ 
    type: 'track', 
    query: searchTerm 
  },
  function(err, data) {
    if (err) {
      return console.log("Error occured: " + err);
    }

  var spotifySong = data.tracks.items;
  // console.log(JSON.stringify(spotifySong[0].artists, null, 2));
  for (var i = 0; i < spotifySong.length; i++) {
    var data = "---------- Track Results for: " + searchTerm + " -----------\n" + "Artist(s): " + spotifySong[i].artists[0].name + "\nTrack Name: " + spotifySong[i].name + "\nPreview URL: " + spotifySong[i].preview_url + "\nAlbum: " + spotifySong[i].album.name + "\n\n";

    console.log("---------- Track Results for: " + searchTerm + " -----------")
    console.log("Artist(s): " + spotifySong[i].artists[0].name);
    console.log("Track Name: " + spotifySong[i].name);
    console.log("Preview URL: " + spotifySong[i].preview_url);
    console.log("Album: " + spotifySong[i].album.name);
    console.log("\n");
    loggingFun(data);
  }
  });
}

// getBands axios function
var getBands = function(searchTerm) {
  if (searchTerm === "") {
    searchTerm = "Baby Shark";
  }
  // Passing command + search to write helper function above.
  var logCom = "\n\n\n\nLIRI BOT Command: " + commands + "\nSearched: " + searchTerm + "\n\n"
  loggingFun(logCom);

  // API call bandsintown
  axios
  .get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
  .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    var axiosData = response.data;
    // var location = axiosData[i].venue.city + ", " + axiosData[i].venue.region + ", " + axiosData[i].venue.country;
    for (var i = 0; i < axiosData.length; i++) {
      var data = "---------- Event Results for Artist/Band: " + searchTerm + " -----------\n" + "Venue Name: " + axiosData[i].venue.name + "\nVenue Location: " + axiosData[i].venue.city + ", " + axiosData[i].venue.region + ", " + axiosData[i].venue.country + "\nShow Date: " + moment(axiosData[i].datetime).format("MM/DD/YYYY") + "\n\n";
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
      loggingFun(data);
    }
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
    }
  });
}

// get movie data function
var getMovie = function(searchTerm) {
  console.log(searchTerm);
  if (searchTerm === "") {
    searchTerm = "Mr Nobody";
  }
  // Passing command + search to write helper function above.
  var logCom = "\n\n\n\nLIRI BOT Command: " + commands + "\nSearched: " + searchTerm + "\n\n"
  loggingFun(logCom);

  var queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
    function(response) {
      var movieData = response.data;
      if (!movieData.response) {
      var data = "---------- Results for Movie: " + searchTerm + " -----------\n" + "Title: " + movieData.Title + "\nIMDB Rating: " + movieData.imdbRating + "\nRotten Tomatoes Rating: " + movieData.Ratings[1].Value + "\nCountry: " + movieData.Country + "\nLanguage: " + movieData.Language + "\nPlot: " + movieData.Plot + "\nActors: " + movieData.Actors + "\n\n";
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
      loggingFun(data);
    }
  });
}

// function that reads random.txt file and passes text via commands to liriBot function.
var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    splitData = data.split(",");
    var commands = splitData[0];
    noQuoteData = splitData[1].replace(/['"]+/g, '');
    var searchTerm = noQuoteData;

    liriBot(commands, searchTerm);
  });
};

var commands = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");
liriBot(commands, searchTerm);

// switch function taking in user arguments and sorts to associated function calls
function liriBot(commands, searchTerm) {
  switch (commands) {
    case "concert-this":
      getBands(searchTerm);
      break;
    case "spotify-this-song":
      spotifySearch(searchTerm);
      break;
    case "movie-this":
      getMovie(searchTerm);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("Not a recognized command by LIRI");
      break;
  }
}