import Album from "../album/Album"
import {React} from 'react';
import { Container, Row, Col } from 'react-grid-system';
import './AlbumGrid.css'

const AlbumGrid = ({albumList}) => {
    //const albums = albumList.slice(0, 9)
    const albums = [
        'spotify:album:4EIy8sPngI3BDqykTtjGON', 
        'spotify:album:4EIy8sPngI3BDqykTtjGON', 
        'spotify:album:4EIy8sPngI3BDqykTtjGON', 
        'spotify:album:4EIy8sPngI3BDqykTtjGON', 
        'spotify:album:4EIy8sPngI3BDqykTtjGON', 
        'spotify:album:4EIy8sPngI3BDqykTtjGON', 
        'spotify:album:4EIy8sPngI3BDqykTtjGON', 
        'spotify:album:4EIy8sPngI3BDqykTtjGON', 
        'spotify:album:4EIy8sPngI3BDqykTtjGON', 
    ]

    return (
        <div className='album-grid'>
            <Container fluid className="container">
                <Row debug>
                    <Col debug>
                        <Album uri={albums[0]}/>
                    </Col>
                    <Col debug>
                        <Album uri={albums[1]}/>
                    </Col>
                    <Col debug>
                        <Album uri={albums[2]}/>
                    </Col>
                </Row>
                <br />
                <br />
                <Row debug>
                    <Col debug>
                        <Album uri={albums[3]}/>
                    </Col>
                    <Col debug>
                        <Album uri={albums[4]}/>
                    </Col>
                    <Col debug>
                        <Album uri={albums[5]}/>
                    </Col>
                </Row>
                <br />
                <br />
                <Row debug>
                <Col debug>
                        <Album uri={albums[6]}/>
                    </Col>
                    <Col debug>
                        <Album uri={albums[7]}/>
                    </Col>
                    <Col debug>
                        <Album uri={albums[8]}/>
                    </Col>
                </Row>
            </Container>

        </div>
    )

}

export default AlbumGrid