import React from 'react';
// import logo from './logo.svg';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      searchResults: [{
        name: 'testname',
        artist: 'testartist',
        album: 'testalbum',
        id: 'testid'
      }],
      playlistName: 'Playlistname1',
      playlistTracks: [{
        name: 'trackplaylist',
        artist: 'artistplaylist',
        album: 'albumplaylist',
        id: 'idplaylist'
      }]
    }

    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(trackelement => {trackelement.id === track.id})){
      this.setState({playlistTracks: this.state.playlistTracks.push(track)});
    }
  }
  
  render() {
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
        </div>
      </div>
    </div>
  );
  }
}

export default App;
