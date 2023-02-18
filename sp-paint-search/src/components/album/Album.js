import { useState, useEffect, React } from "react"
import { spotifyIdFromUri } from "../../func/commonSpotifyFuncs"
import './Album.css'

const Album = ({uri}) => {

    const [album, setAlbum] = useState()
    const id = spotifyIdFromUri(uri)

    useEffect(() => {
        fetch(`https://api.spotify.com/v1/albums/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then(response => response.json())
        .then(json => {
            setAlbum(json)
        })
    }, [id])

    const openAlbum = () => {
        window.open(album.external_urls.spotify, '_blank').focus();
    }

    return (
        <div className='album'
            onClick={() => openAlbum()}
        >
            <img src={album?.images[0]?.url} alt="cover" width={100}/>
        </div>
    )

}

export default Album