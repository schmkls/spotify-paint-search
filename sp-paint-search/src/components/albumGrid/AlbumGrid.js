import Album from "../album/Album"
import {React} from 'react';
import './AlbumGrid.css'




const AlbumGrid = ({albums}) => {
    
    return (
        <div className="album-grid">
            <div className="row">
                <Album uri={albums[0]}/>
                <Album uri={albums[1 % albums.length]}/>
                <Album uri={albums[2 % albums.length]}/>
            </div>
            <div className="row">
                <Album uri={albums[3 % albums.length]}/>
                <Album uri={albums[4 % albums.length]}/>
                <Album uri={albums[5 % albums.length]}/>
            </div>
            <div className="row">
                <Album uri={albums[6 % albums.length]}/>
                <Album uri={albums[7 % albums.length]}/>
                <Album uri={albums[8 % albums.length]}/>
            </div>
        </div>
    )

}

export default AlbumGrid