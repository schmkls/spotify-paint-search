import React, { useEffect, useState } from 'react'
import ReactCanvasPaint from 'react-canvas-paint'
import 'react-canvas-paint/dist/index.css'
import { SketchPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons'
import './Canvas.css'




const Canvas = ({onImageDataChange}) => {
    //color to add to ReactCanvasPaint
    const [color, setColor] = useState("#fff");

    //options for ReactCanvasPaint
    const [choosableColors, setChoosableColors] = useState([]);
    const [strokeWidth, setStrokeWidth] = useState(100);
    const [draw, setDraw] = useState(null)

    useEffect(() => {
        onImageDataChange(draw)
    }, [draw, onImageDataChange])

    const chooseCurrentColor = () => {
        setChoosableColors([...choosableColors, color]);
    }

    return (
        <div className='outer'>
            <div className='canvas'>
                <ReactCanvasPaint 
                    onDraw={setDraw}
                    colors={choosableColors}
                    strokeWidth={strokeWidth}
                />
                <button 
                    style={{color: {color}}} 
                    onClick={() => chooseCurrentColor()}>
                    Add color
                </button>
            </div>
            <div className='color-choose'>
                <div className="sketchpicker">
                    <SketchPicker
                        onChange={(color) => {
                            setColor(color.hex);
                        }}
                        color={color}/>
                </div>
                <div className='brushes'>
                    <button onClick={() => setStrokeWidth(25)}>
                        <FontAwesomeIcon icon={faPaintBrush} size="xs"/>
                    </button>
                    <button onClick={() => setStrokeWidth(50)}>
                        <FontAwesomeIcon icon={faPaintBrush} size="3x"/>
                    </button>
                    <button onClick={() => setStrokeWidth(100)}>
                        <FontAwesomeIcon icon={faPaintBrush} size="6x"/>
                    </button>
                </div> 
            </div>
        </div>
    )
}

export default Canvas