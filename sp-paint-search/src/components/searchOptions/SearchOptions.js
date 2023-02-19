import React, { useState, useEffect } from "react"
import { spotifyIdFromLink } from "../../func/commonSpotifyFuncs"
import Playlist from "../playlist/Playlist"
import LikedSongs from "../playlist/LikedSongs"
import './SearchOptions.css'


const SearchOptions = ({onAlbumsChoose}) => {

    const [detail, setDetail] = useState(50)
    const [includeLikedSongs, setIncludeLikedSongs] = useState(true)
    const [playlistLink, setPlaylistLink] = useState('')
    const [playlists, setPlaylists] = useState([])
    const [albums, setAlbums] = useState([])

    const handlePlaylistSubmit = () => {
        console.log('submitting playlist link: ' + playlistLink);
        let playlistId = spotifyIdFromLink(playlistLink);
        if (playlists.includes(playlistId)) {
            return
        }
        setPlaylists([...playlists, playlistId])
    }

    const handlePlaylistRemove = (playlist) => {
        let updatedPlaylists = playlists.filter((id) => id !== playlist)
        setPlaylists(updatedPlaylists)
        console.log('removing playlist: ' + playlist);
    }

    const handleLikedSongsRemove = () => {
        console.log('removing liked songs');
        setIncludeLikedSongs(false)
    }

    useEffect(() => {
        onAlbumsChoose(albums)
    }, [albums])

    return (
        <div className="outer">
            <div className="labels">
                <label>Unprecise</label>
                <label>Detailed</label>
            </div>
            <input 
                value={detail} 
                type="range" 
                min='0' 
                max='100' 
                onChange={(e) => setDetail(e.target.value)}
                className='slider'/>
            <br/>
            <br/>
            <br/>
            <label>Playlist link: </label>
            <input type="text" id="playlist" name="playlist" onChange={(e) => setPlaylistLink(e.target.value)}/>
            <button onClick={() => handlePlaylistSubmit()}>Add</button>
            {
                includeLikedSongs ? <LikedSongs onRemove={() => handleLikedSongsRemove()}/> : <></>
            }
            {
                playlists.map((playlist) => 
                    <Playlist id={playlist} key={playlist} onRemove={(id) => handlePlaylistRemove(id)}/>
                )
            }
        </div>
    )
}

export default SearchOptions