import TopBar from '../components/topbar/TopBar'
import Canvas from '../components/canvas/Canvas'

const Home = () => {

    return (
        <div>
            <TopBar/>
            <Canvas witdht={400} height={400}/>
        </div>
    )
}

export default Home