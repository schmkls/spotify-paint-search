import { useState, useEffect, React } from "react"
import { spotifyIdFromUri } from "../../func/commonSpotifyFuncs"
import './Album.css'

const Album = ({uri}) => {

    const [albumName, setAlbumName] = useState(null)
    const [cover, setCover] = useState(null)
    const [artist, setArtist] = useState(null)
    const [url, setUrl] = useState(null)

    const [hover, setHover] = useState(false)
    const id = spotifyIdFromUri(uri)

    const handleMouseOver = () => {
        setHover(true);
    };
    
    const handleMouseOut = () => {
        setHover(false);
    };

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
            setArtist(json.artists[0].name)
            setAlbumName(json.name)
            setCover(json.images[0].url)
            setUrl(json.external_urls.spotify)
        })
    }, [id])

    const openAlbum = () => {
        window.open(url, '_blank').focus();
    }

    if (!( albumName && cover && artist && url)) {
        return (
            <div className="album">
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <label>Loading...</label>
            </div>
        )
    }

    return (
        <div className='album'>
            {
                hover ? 
                        <div className='hover'
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}>
                            <img 
                                src={cover} 
                                alt="cover" 
                                width={260} 
                                className="cover"/>
                            <img 
                                src={'/icons/SPOTIFY_ICON.png'} 
                                alt='spotify_icon' 
                                className='hover-spotify-logo'
                                onClick={() => openAlbum()}
                                />
                            <label className='hover-album-data'>{albumName} - {artist}</label>
                        </div>
                    : 
                        <img 
                            src={cover} 
                            alt="cover" 
                            width={180} 
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                            className="cover-small"/>
            }
        </div>
    )

}

export default Album