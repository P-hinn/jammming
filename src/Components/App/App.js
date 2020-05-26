import React from 'react';
// import logo from './logo.svg';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import User from '../User/User';

import Spotify from '../../util/Spotify';

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: [],
      playStatus: '',
    }

    Spotify.getUser().then(username => this.setState({username: username}));

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.playTrack = this.playTrack.bind(this);
    this.pauseTrack = this.pauseTrack.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    let resultTracks = this.state.searchResults;

    tracks.push(track);
    resultTracks = resultTracks.filter(trackelement => trackelement.id !== track.id);

    this.setState({
      searchResults: resultTracks,
      playlistTracks: tracks
    });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let resultTracks = this.state.searchResults;

    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    resultTracks.unshift(track);

    this.setState({
      searchResults: resultTracks,
      playlistTracks: tracks
    });
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
      .then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        })
      })
  }
  
  search(searchTerm) {
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  playTrack(track){
    Spotify.playTrack(track);
    this.setState({playStatus: track});
  }

  pauseTrack(){
    Spotify.pauseTrack();    
    this.setState({playStatus: ''});
  }
  
  render() {
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing 
          {/* <User username={this.state.username}/>  */}
      </h1>
      <div className="App">
        <div class="github">
          <a href="https://github.com/P-hinn/jammming" target="_blank"><i class="fab fa-github fa-4x"></i></a>
        </div>
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults 
            searchResults={this.state.searchResults} 
            onAdd={this.addTrack}
            onPlay={this.playTrack}
            onPause={this.pauseTrack}
            plays={this.state.playStatus}
          />
          <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks} 
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
            onPlay={this.playTrack}
            onPause={this.pauseTrack}
            plays={this.state.playStatus}
            username={this.state.username}
          />
        </div>
      </div>
    </div>
  );
  }
}

export default App;
