import React from 'react';
import './TrackList.css';

import Track from '../Track/Track';

class TrackList extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="TrackList">
                {
                this.props.tracks.map(track => {
                    return <Track track={track} key={track.id} onAdd={this.props.onAdd}/>
                })
                }
            </div>
        );
    }
}

export default TrackList;