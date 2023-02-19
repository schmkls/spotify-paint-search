import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './Playlist.css'

const LikedSongs = ({onRemove}) => {


    return (
        <div className='playlist'>
            <label>Liked Songs</label>
            <FontAwesomeIcon icon={faHeart} size="xs"/>
            <button onClick={() => onRemove()} className='remove-button'>X</button>
        </div>

    )
}    

export default LikedSongs