import { useState, useEffect, React } from "react"
import { spotifyIdFromUri } from "../../func/commonSpotifyFuncs"
import './Album.css'

const Album = ({uri}) => {

    const [album, setAlbum] = useState(null)

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
            setAlbum(json)
        })
    }, [id])

    const openAlbum = () => {
        window.open(album.external_urls.spotify, '_blank').focus();
    }

    if (album === null || album === undefined) {
        return (
            <div className='album'>

            </div>
        )
    }


    return (
        <div className='album'>
            {
                hover ? 
                        <div className='hover'>
                            <img 
                                src={album?.images[0]?.url} 
                                alt="cover" 
                                width={260} 
                                onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}
                                className="cover"/>
                            <img 
                                src={'/icons/SPOTIFY_ICON.png'} 
                                alt='spotify_icon' 
                                className='hover-spotify-logo'
                                onClick={() => openAlbum()}
                                />
                            <label className='hover-album-data'>{album?.name} - {album?.artists[0].name}</label>
                        </div>
                        
                    : 
                        <img 
                            src={album?.images[0]?.url} 
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