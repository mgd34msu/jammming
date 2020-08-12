// let's not upload API keys to github ...
import {spotifyApiKey} from './apikey';

let accessToken;

const clientId = {spotifyApiKey};
const redirectURI = 'http://localhost:3000/';

const Spotify = {

    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location.assign(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`);
        }
    },

    search(term) {
        accessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
           headers: {Authorization: `Bearer ${accessToken}`}
        })
        .then(response => {
            if (response.ok) {
            return response.json();
            }
            throw new Error('Request failed');
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            console.log(`This is jsonResponse from SPOTIFY 'search' method:`, jsonResponse)
            return jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                }
            })
        })
    },

    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs) {
            return;
        } else {
            let userId = '';
            let playlistId = '';
            const headers = {Authorization: `Bearer ${accessToken}`};
            fetch(`https://api.spotify.com/v1/me`, { headers: headers })
            .then(response => {
                const jsonResponse = response.json();
                userId = jsonResponse.id;
            })
            fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Content_type: 'application/json'
                },
                body: JSON.stringify({
                    name: name
                })
            })
            .then(response => {
                    const jsonResponse = response.json();
                    playlistId = jsonResponse.id;
            })
            fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Content_type: 'application/json'
                },
                body: JSON.stringify({
                    uris: trackURIs
                })
            })
            .then(response => {
                const jsonResponse = response.json();
                playlistId = jsonResponse.id;
            })

        }
    }

}

export default Spotify;
