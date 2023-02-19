import Album from "../album/Album"
import {React} from 'react';
import './AlbumGrid.css'




const AlbumGrid = ({albums}) => {

    return (
        <div className="album-grid">
            <div className="row">
                <Album uri={albums[0]}/>
                <Album uri={albums[0]}/>
                <Album uri={albums[0]}/>
            </div>
            <div className="row">
                <Album uri={albums[0]}/>
                <Album uri={albums[0]}/>
                <Album uri={albums[0]}/>
            </div>
            <div className="row">
                <Album uri={albums[0]}/>
                <Album uri={albums[0]}/>
                <Album uri={albums[0]}/>
            </div>
        </div>
    )

}

export default AlbumGrid