import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './Playlist.css'

const LikedSongs = ({onRemove}) => {


    return (
        <div className='playlist'>
            <FontAwesomeIcon icon={faHeart} size="lg"/>
            <label>Liked Songs</label>
            <button onClick={() => onRemove()} className='remove-button'>X</button>
        </div>

    )
}    

export default LikedSongs