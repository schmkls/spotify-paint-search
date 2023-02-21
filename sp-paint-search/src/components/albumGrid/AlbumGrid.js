import Album from "../album/Album"
import {React} from 'react';
import './AlbumGrid.css'




const AlbumGrid = ({albums}) => {

    const topAlbums = albums.slice(0, 9)

    return (
        <div className="album-grid">
            <div className="row">
                <Album uri={topAlbums[0]}/>
                <Album uri={topAlbums[1]}/>
                <Album uri={topAlbums[2]}/>
            </div>
            <div className="row">
                <Album uri={topAlbums[3]}/>
                <Album uri={topAlbums[4]}/>
                <Album uri={topAlbums[5]}/>
            </div>
            <div className="row">
                <Album uri={topAlbums[6]}/>
                <Album uri={topAlbums[7]}/>
                <Album uri={topAlbums[8]}/>
            </div>
        </div>
    )

}

export default AlbumGrid