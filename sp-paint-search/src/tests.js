//own simple testing module

import {colorDistance, imageDataFromURL, getColorAt} from './func/matching';


const getColorAtTest = async() => {
    const black = await imageDataFromURL('https://upload.wikimedia.org/wikipedia/commons/7/71/Black.png?20110927180820', 400)
    const colorInMiddle = getColorAt(black, 200, 200, 1)
    const colorInTopLeft = getColorAt(black, 0, 0, 1)
    const colorInTopRight = getColorAt(black, 399, 0, 1)
    const colorInBottomLeft = getColorAt(black, 0, 399, 1)
    const colorInBottomRight = getColorAt(black, 399, 399, 1)
    if (colorInMiddle.r !== 0 && colorInMiddle.g !== 0 && colorInMiddle.b !== 0) {
        console.log('colorInMiddle: ' + JSON.stringify(colorInMiddle))
        return false
    }
    if (colorInTopLeft.r !== 0 && colorInTopLeft.g !== 0 && colorInTopLeft.b !== 0) {
        console.log('colorInTopLeft: ' + JSON.stringify(colorInTopLeft))
        return false
    }
    if (colorInTopRight.r !== 0 && colorInTopRight.g !== 0 && colorInTopRight.b !== 0) {
        console.log('colorInTopRight: ' + JSON.stringify(colorInTopRight))
        return false
    }
    if (colorInBottomLeft.r !== 0 && colorInBottomLeft.g !== 0 && colorInBottomLeft.b !== 0) {
        console.log('colorInBottomLeft: ' + JSON.stringify(colorInBottomLeft))
        return false
    }
    if (colorInBottomRight.r !== 0 && colorInBottomRight.g !== 0 && colorInBottomRight.b !== 0) {
        console.log('colorInBottomRight: ' + JSON.stringify(colorInBottomRight))
        return false
    }
    return true
}


const testFuncs = [
    getColorAtTest
]


export const runTests = async() => {
   for (let i = 0; i < testFuncs.length; i++) {
       if (! await testFuncs[i]()) {
            console.log('!!!!!!!TEST FAIL: ' + testFuncs[i].name);
       } else {
            console.log('TEST PASS: ' + testFuncs[i].name);
       }
   }
}