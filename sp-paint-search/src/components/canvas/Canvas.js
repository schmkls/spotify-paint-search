import React, { useState } from 'react'
import ReactCanvasPaint from 'react-canvas-paint'
import 'react-canvas-paint/dist/index.css'
import { SketchPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons'
import './Canvas.css'




const Canvas = () => {
    //creating state to store our color and also set color using onChange event for sketch picker
    const [detail, setDetail] = useState(0);
    const [color, setColor] = useState("#fff");
    const [choosableColors, setChoosableColors] = useState([]);
    const [strokeWidth, setStrokeWidth] = useState(100);

    const chooseCurrentColor = () => {
        setChoosableColors([...choosableColors, color]);
    }

    return (
        <div className='outer'>
            <button
                onClick={() => window.location.reload()}>
                Clear
            </button>
            <div className='canvas'>
                <ReactCanvasPaint 
                    colors={choosableColors}
                    strokeWidth={strokeWidth}
                />
            </div>
            <input 
                value={detail} 
                type="range" 
                min='0' 
                max='100' 
                onChange={(e) => setDetail(e.target.value)}
                className='slider'
            />
            <div className='color-choose'>
                <button 
                    style={{color: {color}}} 
                    onClick={() => chooseCurrentColor()}>
                    Add color
                </button>
                <div className="sketchpicker">
                    <SketchPicker
                        onChange={(color) => {
                            setColor(color.hex);
                        }}
                        color={color}
                    />
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
        </div>
    )
}

export default Canvas