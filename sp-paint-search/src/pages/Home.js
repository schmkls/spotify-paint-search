import TopBar from '../components/topbar/TopBar'
import Canvas from '../components/canvas/Canvas'
import Album from '../components/album/Album'

const Home = () => {



    return (
        <div>
            <TopBar/>
            <Canvas/>
            <Album uri={'spotify:album:4EIy8sPngI3BDqykTtjGON'}></Album>
        </div>
    )
}

export default Home