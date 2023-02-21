import React, { useState, useEffect } from "react"
import { spotifyIdFromLink, getAlbumsFromPlaylistId} from "../../func/commonSpotifyFuncs"
import Playlist from "../playlist/Playlist"
import LikedSongs from "../playlist/LikedSongs"
import './SearchOptions.css'

/**
 * Component for choosing albums of search and detail level of search
 */
const SearchOptions = ({onAlbumsChoose, onDetaiLevelChange}) => {

    const [detail, setDetail] = useState(50)
    const [includeLikedSongs, setIncludeLikedSongs] = useState(true)
    const [playlistLink, setPlaylistLink] = useState('')
    const [playlists, setPlaylists] = useState([])

    const handlePlaylistSubmit = () => {
        let playlistId = spotifyIdFromLink(playlistLink);
        if (playlists.includes(playlistId)) {
            return
        }

        let newPlaylists = [...playlists, playlistId]
        setPlaylists([...playlists, playlistId])
        handlePlaylistChange(newPlaylists)
    }

    const handlePlaylistRemove = (playlistId) => {
        let newPlaylists = playlists.filter((id) => id !== playlistId)
        setPlaylists(newPlaylists)
        handlePlaylistChange(newPlaylists)
    }

    const handlePlaylistChange = (newPlaylists) => {
        console.log('PLAYLISTS CHANGE! CALLING SPOTIFY API');
        if (newPlaylists.length === 0) {
            onAlbumsChoose([])
        }

        for (let playlist in newPlaylists) {
            getAlbumsFromPlaylistId(newPlaylists[playlist])
            .then((newAlbums) => {
                onAlbumsChoose(newAlbums)
            })
            .catch((err) => console.log(err))
        }
    }

    const handleLikedSongsRemove = () => {
        console.log('removing liked songs');
        setIncludeLikedSongs(false)
    }

    //feed up detail level
    useEffect(() => {
        onDetaiLevelChange(detail)
    }, [detail, onDetaiLevelChange])

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