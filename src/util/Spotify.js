import { getQueriesForElement } from "@testing-library/react";

const clientId = process.env.REACT_APP_CLIENT_ID;
// const redirectUri = 'http://helpless-mass.surge.sh';
const redirectUri = 'http://localhost:3000';
//const redirectUri = 'https://www.philippniestroj.com/source/jammming/';
let accessToken;

const Spotify = {
    getAccesToken() {
        if(accessToken){
            return accessToken;
        }
         
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

            if(accessTokenMatch && expiresInMatch){
                accessToken = accessTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]);
                //This clears the parameter, allowing us to grab a new acces token when it expires.
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Acces Token', null, '/');
                return accessToken;
            } else {
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public%20user-modify-playback-state%20streaming%20user-read-private&redirect_uri=${redirectUri}`;
                window.location = accessUrl;
            }
    },

    search(searchTerm) {
        const accessToken = Spotify.getAccesToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, 
        {headers: {
            Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
                return response.json();
        }) .then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));            
        });
    },

    savePlaylist(name, trackUris) {
        if(!name || !trackUris.length){
            return;
        } 

        const accessToken = Spotify.getAccesToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers}
            ).then(response => response.json()
            ).then(jsonResponse => {
                userId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({name: name})
                }).then(response => response.json()
                ).then(jsonResponse => {
                    const playListId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`,
                    {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ uris: trackUris})
                    })
                })
            });
    },

    playTrack(track){
        const accessToken = Spotify.getAccesToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        return fetch(`https://api.spotify.com/v1/me/player/play`,
            {
                headers: headers,
                method: 'PUT',
                body: JSON.stringify({uris: [track.uri]})
            })      
    },

    pauseTrack(){
        const accessToken = Spotify.getAccesToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        return fetch('https://api.spotify.com/v1/me/player/pause',
        {
            headers: headers,
            method: 'PUT'
        });
    },
    getUser(){
        const accessToken = Spotify.getAccesToken();
        const headers = {Authorization: `Bearer ${accessToken}`};

        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json())
        .then(jsonResponse => {
        //returns userObejct
        return jsonResponse.display_name;
        })
    }
}



export default Spotify;