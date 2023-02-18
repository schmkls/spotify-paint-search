import React, { useState, useEffect } from 'react'

const Home = () => {

    const [name, setName] = useState('')
    const now = Date.now()

    useEffect(() => {
        fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')), 
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(response => response.json())
        .then(json => {
            setName(json.display_name)
        })
    }, [])
    

    return (
        <div>
            <h1>Home</h1>
            <h3>{localStorage.getItem('access_token')}</h3>
            <h2>{name}</h2>
            <h2>{now}</h2>
        </div>
    )
}

export default Home