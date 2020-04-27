import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';
import User from '../User/User';

class Playlist extends React.Component{
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
                <div className="User">
                    <User username={this.props.username}/>
                </div>
                <TrackList  tracks={this.props.playlistTracks} 
                            onRemove={this.props.onRemove} 
                            isRemoval={true}
                            onPlay={this.props.onPlay}
                            onPause={this.props.onPause}
                            plays={this.props.plays}
                            />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default Playlist;