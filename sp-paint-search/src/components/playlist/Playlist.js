import React, { useState, useEffect} from "react";
import './Playlist.css'

const Playlist = ({id, onRemove}) => {

    const [image, setImage] = useState(null)
    const [name, setName] = useState('')

    useEffect(() => {
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
            setImage(json.images[0].url)
            setName(json.name)
        })
    }, [id])

    return (
        <div className='playlist'>
            {
                image === null ? <label>Searching for playlist...</label> : 
                <img src={image} className='playlist-image' alt='cover'/>
            }
            <label className='name-label'>  {name}</label>
            <button onClick={() => onRemove(id)} className='remove-button'>X</button>
        </div>
    )
}

export default Playlist