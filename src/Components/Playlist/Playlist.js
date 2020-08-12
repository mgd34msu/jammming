import React from 'react';
import { TrackList } from '../TrackList/TrackList'
import './Playlist.css';

export class Playlist extends React.Component {

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
        e.preventDefault();
    }

    render() {
        return (
            <div className="Playlist">
                <input defaultValue={'NewPlaylist'} onChange={this.handleNameChange} />
                <TrackList isRemoval={true} onRemove={this.props.onRemove} tracks={this.props.playlistTracks} />
                <button onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
    )
    }
}
