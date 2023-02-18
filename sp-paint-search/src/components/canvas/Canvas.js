import React, { useState } from 'react'
import ReactCanvasPaint from 'react-canvas-paint'
import 'react-canvas-paint/dist/index.css'
import { SketchPicker } from 'react-color';
import './Canvas.css'




const Canvas = () => {
    //creating state to store our color and also set color using onChange event for sketch picker
    const [color, setColor] = useState("#fff");
    const [choosableColors, setChoosableColors] = useState([]);
    const [strokeWidth, setStrokeWidth] = useState(100);

    const chooseCurrentColor = () => {
        setChoosableColors([...choosableColors, color]);
    }

    return (
        <div className='outer'>
            <button onClick={() => setStrokeWidth(strokeWidth/2)}>changesize?</button>
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
                </div>
            </div>
        </div>
    )
}

export default Canvas