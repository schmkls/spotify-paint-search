import React, { useState, useEffect } from 'react'
import { Buffer } from 'buffer';

const Home = () => {

    const [name, setName] = useState('')

    useEffect(() => {
        fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }).
        then(response => response.json())
        .then(json => {
            setName(json.display_name)
        })
    }, [])
    

    return (
        <div>
            <h1>Home</h1>
            <h2>{name}</h2>
        </div>
    )
}

export default Home