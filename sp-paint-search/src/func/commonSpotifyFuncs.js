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


export const getAlbumsWithImageData = async (albums) => {
    return new Promise(async(res, rej) => {
        let albumsAndImages = []
        for (let i in albums) {
            let id = albums[i]
            await fetch(`https://api.spotify.com/v1/albums/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            })
            .then(response => response.json())
            .then(json => {
                let image = json.images[0].url
                albumsAndImages.push({id: id, image: image})
            })
            .catch((err) => {console.log(err)})      
        }
        return res(albumsAndImages)
    })
}


