import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {

    constructor(props) {
        super(props)
        this.test = this.test.bind(this);
    }

    test() {
        console.log(`This is "tracks" property from TrackList component:`, this.props.tracks);
    }

    render() {
        return (
            <div  className="TrackList">
                {this.test()}
                    {
                        this.props.tracks.map(track => {
                            return <Track key={track.id} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} onAdd={this.props.onAdd} track={track} name={track.name} artist={track.artist} album={track.album} />
                        })
                    }
            </div>
        )
    }
}  
