export const spotifyIdFromUri = (uri) => {
    return uri.substring(uri.lastIndexOf(':') + 1);
}

export const spotifyIdFromLink = (link) => {
    let endIndex = link.length;
    if (link.includes('?')) {
        endIndex = link.indexOf('?');
    }
    return link.substring(link.lastIndexOf('/') + 1, endIndex);
}

export const getAlbumsFromPlaylistId = async (id, includeLikedSongs) => {

    console.log('getting albums from playlist: ' + id + '...');

    return new Promise((res, rej) => {
        let albums = [];

        fetch(`https://api.spotify.com/v1/playlists/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then(response => response.json())
        .then(json => {
            for (let key in json["tracks"]["items"]) {
                let albumId = json["tracks"]["items"][key]["track"]["album"]["id"]

                if (albums.includes(albumId)) {
                    continue;
                }
                albums.push(albumId)
            }
            return res(albums)
        })        
    })
        
}

