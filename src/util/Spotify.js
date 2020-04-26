const clientId = '715f2ccee5e04475ab3bc5375176f201';
const redirectUri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccesToken() {
        if(accessToken){
            return accessToken;
        }

            //check for access token
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

            if(accessTokenMatch && expiresInMatch){
                accessToken = accessTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]);
                //This clears the parameter, allowing us to grab a new acces token when it expires.
                window.setTimeout(() => accessToken = '', expiresInMatch * 1000);
                window.history.pushState('Acces Token', null, '/');
                return accessToken;
            } else {
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
                window.location = accessUrl;
            }
    },
    search(searchTerm) {
        const accesToken = Spotify.getAccesToken();
        return fetch('https://api.spotify.com/v1/search?type=track&q=' + searchTerm, 
        {headers: {
            Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
                return response.json();
        }) .then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            } else{
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            }
        })
    },
    savePlaylist(name, trackUris) {
        if(!name || !trackUris.length){
            return;
        } 

        const accesToken = Spotify.getAccesToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers}
            ).then(response => response.json()
            ).then(jsonResponse => {
                userId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlist`,
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
    }
}



export default Spotify;