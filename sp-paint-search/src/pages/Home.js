import React, {useState, useEffect} from 'react'
import TopBar from '../components/topbar/TopBar'
import Canvas from '../components/canvas/Canvas'
import AlbumGrid from '../components/albumGrid/AlbumGrid'
import SearchOptions from '../components/searchOptions/SearchOptions'
import { getAlbumsWithImageData } from '../func/commonSpotifyFuncs'
import './Home.css'

const featuredAlbums = [
    "spotify:album:4EIy8sPngI3BDqykTtjGON", 
    "spotify:album:1G9NXS6bwV9JHeaCNETAFI", 
    "spotify:album:26t2atAvmcNwZFJ0b3VHm9", 
    "spotify:album:1JXnrNpiExB8uScA3duWOW", 
    "spotify:album:1vWnB0hYmluskQuzxwo25a", 
    "spotify:album:46YfeDd8YhuAcywdxZkRqf", 
    "spotify:album:6uOn9t70gVO6YPU4M65h5g", 
    "spotify:album:0b4R5wYw27gkjd2Mt4C8AP", 
    "spotify:album:443fOM9A1XN8A0HImpYKVT"
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
        getAlbumsWithImageData(albums)
        .then((albumsAndImages) => {
            setSearchAlbums(albumsAndImages)
        })
    }

    useEffect(() => {
        console.log('----------------------------------------------------');
        /*
        console.log('getting new result albums with');
        console.log('imageData: ' + imageData);
        console.log('searchAlbums: ' + searchAlbums);
        console.log('detailLevel: ' + detailLevel);*/
    }, [searchAlbums, imageData, detailLevel, resultAlbums])


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