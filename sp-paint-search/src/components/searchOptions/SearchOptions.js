import React, { useState, useEffect } from "react"
import { spotifyIdFromLink, getAlbumsFromPlaylistId} from "../../func/commonSpotifyFuncs"
import Playlist from "../playlist/Playlist"
import './SearchOptions.css'

/**
 * Component for choosing albums of search and detail level of search
 */
const SearchOptions = ({onAlbumsChoose, onDetailLevelChange, onSearch}) => {
    const initialDetailLevel = 100
    const [detail, setDetail] = useState(initialDetailLevel)
    const [playlistLink, setPlaylistLink] = useState('')
    const [playlists, setPlaylists] = useState([])
    const [searchReady, setSearchReady] = useState(false)


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
        setSearchReady(false)
        if (newPlaylists.length === 0) {
            onAlbumsChoose([])
        }

        for (let playlist in newPlaylists) {
            getAlbumsFromPlaylistId(newPlaylists[playlist])
            .then((newAlbums) => {
                onAlbumsChoose(newAlbums)
                setSearchReady(true)
            })
            .catch((err) => console.log(err))
        }
    }


    //feed up detail level
    useEffect(() => {
        if (!detail) {
            onDetailLevelChange(initialDetailLevel)
        } else {
            onDetailLevelChange(detail)
        }
    }, [detail, onDetailLevelChange])
    

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
                playlists.map((playlist) => 
                    <Playlist id={playlist} key={playlist} onRemove={(id) => handlePlaylistRemove(id)}/>
                )
            }
            {
                searchReady ? 
                    <button onClick={() => onSearch()}> Search </button> 
                : 
                    <></>
            }
            
        </div>
    )
}

export default SearchOptions