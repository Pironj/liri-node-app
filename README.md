# LIRI BOT App
LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.  The app then logs all your searches and returned data in a text file `log.txt` in an easy to read format.

# To Run:
Open your terminal and type the following in the command `node liri.js`:
  * Below is a list of arguments that the Liri app can take:
    ```
    concert-this
    spotify-this-song
    movie-this
    do-what-this-says
    ```
  * Below are example inputs:
    ```
    node liri.js concert-this metallica
    node liri.js spotify-this-song enter sandman
    node liri.js movie-this fear and loathing las vegas
    node liri.js do-what-this-says
    ```
# Video Demo
[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](http://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)

## Install app instruction:

  * Clone this repository to your local machine: 
    ```
    git clone https://github.com/Pironj/liri-node-app.git
    ```
  * Then, run `npm install` to get dependacies contained in the `package.json` file
  

  * Create your own `.env` file to store your api keys like follows:
    ```
    # Spotify API keys

    SPOTIFY_ID=your-spotify-id
    SPOTIFY_SECRET=your-spotify-secret
    ```
  * Link your`.env` file you just created to a `keys.js` file that will hold your api private key information like follows:
    ```
    exports.spotify = {
      id: process.env.SPOTIFY_ID,
      secret: process.env.SPOTIFY_SECRET
    };
    ```
  * Ensure `.env` is in your `.gitignore` file before you push up to github.
  
## Technologies:
  * Node.js
  * Javascript
  * Axios
  * Moment.js
  * Spotify API
  * Bands In Town API
  * OMDB API
  