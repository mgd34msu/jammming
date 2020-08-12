import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util//Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      PlaylistName: 'New Playlist',
      PlaylistTracks: [],
      SearchResults: []
    }
  }

  addTrack(track) {
    if (this.state.PlaylistTracks.some(savedTrack => {
        return savedTrack.id = track.id;
      })) {
        return;
      } else {
      let newPlaylist = this.state.PlaylistTracks;
      console.log('This is newPlaylist variable before adding the track', newPlaylist);
      newPlaylist.push(track);
      console.log('This is the newPlaylist variable after adding the new track', newPlaylist);
      this.setState({
        PlaylistTracks: newPlaylist
      })
      }
    }

  removeTrack(track) {
    const foundTrack = this.state.PlaylistTracks.find(matchTrack => {
       matchTrack.id = track.id;
    });
    const index = this.state.PlaylistTracks.indexOf(foundTrack);
    const newPlaylist = this.state.PlaylistTracks.splice(index, 1)
    this.setState({
      PlaylistTracks: newPlaylist
    });
  }

  updatePlaylistName(name) {
    this.setState({
      PlaylistName: name
    })
  }

  savePlaylist() {
    const trackUris = this.state.PlaylistTracks.map(track => {
      return track.uri;
    });
    Spotify.savePlaylist(this.props.PlaylistName, trackUris);
    this.setState({
      PlaylistName: 'New Playlist',
      playlistTracks: []
    })
  }

  search(term) {
    Spotify.search(term)
    .then(searchResults => {
      this.setState({
        SearchResults: searchResults
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
          <SearchResults onAdd={this.addTrack} searchResults={this.state.SearchResults} />
          <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.PlaylistName} playlistTracks={this.state.PlaylistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
