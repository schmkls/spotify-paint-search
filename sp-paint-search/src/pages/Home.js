import TopBar from '../components/topbar/TopBar'
import Canvas from '../components/canvas/Canvas'
import AlbumGrid from '../components/albumGrid/AlbumGrid'
import './Home.css'

const Home = () => {

    return (
        <div className='grid-container'>
            <TopBar/>
            <Canvas/>
            <AlbumGrid/>
        </div>
    )
}

export default Home