import React from 'react';
import './SearchResults.css';

import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component{

    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList 
                    tracks={this.props.searchResults} 
                    onAdd={this.props.onAdd} 
                    isRemoval={false}
                    onPlay={this.props.onPlay}
                    onPause={this.props.onPause}
                    plays={this.props.plays}
                    />
            </div>
        );
    }
}

export default SearchResults;