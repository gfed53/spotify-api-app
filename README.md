## Build Instructions

1. Make sure npm is installed, then in the terminal, run `npm i` to install all dependencies.

2. Before you start using the app, you will need to supply the app with an API key.

  * Navigate to config.js.

  * You should find the places where the API keys are needed. For Spotify, only the client ID is required, not the secret key.

  	* [Spotify key link](https://developer.spotify.com/web-api/)

3. You can serve the app locally by running `npm start`. The app listens at port 8080.

# About This App

This app allows users to search for an artist by keyword, then browse different artists by grabbing a randomly selected but related artist.

Users can also choose whether they want a more mainstream artist, or a more underground one. 

Note that some artists may not even have related mainstream or underground artists (like Bruno Mars, for example).