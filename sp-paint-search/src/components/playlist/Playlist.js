import React, { useState, useEffect} from "react";

const Playlist = ({id, onRemove}) => {

    const [image, setImage] = useState('')
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
        })
    })

    return (
        <div className='playlist'>
            <img src={image} width={40}/>
            <button onClick={() => onRemove(id)}>Remove</button>
        </div>
    )
}

export default Playlist