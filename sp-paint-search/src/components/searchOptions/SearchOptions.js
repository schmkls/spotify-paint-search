import React, { useState } from "react"
import './SearchOptions.css'

const SearchOptions = () => {

    const [detail, setDetail] = useState(50)
    const [includeLikedSongs, setIncludeLikedSongs] = useState(true)
    const [playlistLink, setPlaylistLink] = useState('')

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
                <label>Liked songs</label>
                <input
                    type="checkbox"
                    checked={includeLikedSongs}
                    onChange={(e) => setIncludeLikedSongs(e.target.val)}
                />
                <br/>
                <label>Playlist link: </label>
                <input type="text" id="playlist" name="playlist" onChange={(e) => setPlaylistLink(e.target.value)}/>
        </div>
    )
}

export default SearchOptions