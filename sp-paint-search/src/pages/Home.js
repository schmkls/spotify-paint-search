import React, {useState, useEffect} from 'react'
import TopBar from '../components/topbar/TopBar'
import Canvas from '../components/canvas/Canvas'
import AlbumGrid from '../components/albumGrid/AlbumGrid'
import SearchOptions from '../components/searchOptions/SearchOptions'
import './Home.css'

const featuredAlbums = [
    "spotify:album:4EIy8sPngI3BDqykTtjGON", 
    "spotify:album:4EIy8sPngI3BDqykTtjGON", 
    "spotify:album:4EIy8sPngI3BDqykTtjGON", 
    "spotify:album:4EIy8sPngI3BDqykTtjGON", 
    "spotify:album:4EIy8sPngI3BDqykTtjGON", 
    "spotify:album:4EIy8sPngI3BDqykTtjGON", 
    "spotify:album:4EIy8sPngI3BDqykTtjGON", 
    "spotify:album:4EIy8sPngI3BDqykTtjGON", 
    "spotify:album:4EIy8sPngI3BDqykTtjGON"
]

const Home = () => {

    const [detailLevel, setDetailLevel] = useState(0.5)
    const [imageData, setImageData] = useState()
    const [searchAlbums, setSearchAlbums] = useState([])
    const [resultAlbums, setResultAlbums] = useState(featuredAlbums)

    const handleDetailLevelChange = (detailLevel) => {
        setDetailLevel(detailLevel / 100)
    }

    const handleImageDataChange = (imageData) => {
        setImageData(imageData)
    }

    const handleAlbumsChange = (albums) => {
        console.log('searching with albums: ' + albums);
        setSearchAlbums(albums)
    }


    return (
        <div className='grid-container'>
            <TopBar/>
            <Canvas onImageDataChange={(imgData) => handleImageDataChange(imgData)}/>
            <SearchOptions 
                onAlbumsChoose={(albums) => handleAlbumsChange(albums)}
                onDetaiLevelChange={(detailLevel) => handleDetailLevelChange(detailLevel)}/>
            <AlbumGrid albums={resultAlbums}/>
        </div>
    )
}

export default Home