import './TopBar.css'


const TopBar = () => {

    return (
        <div className="top-bar">
            <div className="outer-rectangle">
                <img alt="spotify icon" src="/icons/SPOTIFY_ICON.png" className="spotify-icon"/>
                <a href="url" className="guide">Guide</a>
                <a href="url" className="about">About</a>
                <p className="title">Paint Search</p>
            </div>
        </div>
        
    )
}

export default TopBar