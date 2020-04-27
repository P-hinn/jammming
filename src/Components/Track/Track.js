import React from 'react';
import './Track.css';

class Track extends React.Component{
    constructor(props){
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.playTrack = this.playTrack.bind(this);
        this.pauseTrack = this.pauseTrack.bind(this);
    }

    renderAction(){
        if(this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        } else{
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }

    addTrack() {
       this.props.onAdd(this.props.track); 
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    play() {
        if(this.props.plays.id === this.props.track.id) {
            return <button className="Play-action" onClick={this.pauseTrack}>Pause</button>
        } else{
            return <button className="Play-action" onClick={this.playTrack}>Play</button>
        }
    }

    playTrack() {
        this.props.onPlay(this.props.track);
    }

    pauseTrack() {
        this.props.onPause();
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.play()}
                {this.renderAction()}
            </div>
        );
    }
}

export default Track; 