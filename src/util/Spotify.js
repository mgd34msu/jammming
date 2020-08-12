// let's not upload API keys to github ...
import {spotifyApiKey} from './apikey';

let accessToken;

const clientId = {spotifyApiKey};
const redirectURI = 'http://localhost:3000/';

const Spotify = {
  getAccessToken(){
    if(accessToken){
      return accessToken;
    }

    // grab access token and timeout
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch){
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // clear params, allowing for new token grab after expiration
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    } else {
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessURL;
    }
  }
};

export default Spotify;
