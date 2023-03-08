import Album from "../album/Album"
import {React} from 'react';
import './AlbumGrid.css'

const COLS = 3
const ROWS = 3

const AlbumGrid = ({albums}) => {
    
    let albumGrid = []
    for (let r = 0; r < ROWS; r++) {
        albumGrid.push(albums.slice(r * COLS, r * COLS + COLS))
    }

    console.log(albumGrid);

    return (
        <div className="album-grid">
            {
                albumGrid.map((row, index) => 
                    <div className="row" key={index}>
                        {
                            row.map((album, index) => 
                                <Album uri={row[index % albums.length]} key={album}/>
                            )
                        }
                    </div>
                )
            }
        </div>
    )

}

export default AlbumGrid