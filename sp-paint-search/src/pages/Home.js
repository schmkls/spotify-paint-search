import TopBar from '../components/topbar/TopBar'
import Canvas from '../components/canvas/Canvas'
import AlbumGrid from '../components/albumGrid/AlbumGrid'
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

    return (
        <div className='grid-container'>
            <TopBar/>
            <Canvas/>
            <AlbumGrid albums={featuredAlbums}/>
        </div>
    )
}

export default Home