//own simple testing module

import {imageDataFromURL, matchValue, getColorAt, colorDistance} from './func/matching';

const colorDistanceZeroForEqualColors = () => {
    const colorOne = { r: 255, g: 255, b: 255, a: 255}

    const colorTwo = { r: 255, g: 255, b: 255, a: 255}

    const distance = colorDistance(colorOne, colorTwo)

    return distance === 0
}


const positiveDistanceIfAlphaDiffers = () => {
    const colorOne = { r: 32, g: 36, b: 22, a: 32}
    const colorTwo = { r: 32, g: 36, b: 22, a: 69}

    const distance = colorDistance(colorOne, colorTwo)
    return distance > 0
}


const expectedColorDistancesByEye = () => {
    const red = { r: 255, g: 0, b: 0, a: 255}
    const orange = { r: 255, g: 127, b: 0, a: 255}
    const yellow = { r: 255, g: 255, b: 0, a: 255}
    const blue = { r: 0, g: 0, b: 255, a: 255}
    const grey = { r: 127, g: 127, b: 127, a: 255}
    const black = { r: 0, g: 0, b: 0, a: 255}

    const redOrange = colorDistance(red, orange)
    const orangeYellow = colorDistance(orange, yellow)
    const greyBlack = colorDistance(grey, black)
    const blackRed = colorDistance(black, red)
    const blueRed = colorDistance(blue, red)

    if (redOrange > blueRed) return false
    if (orangeYellow > blueRed) return false
    if (greyBlack > blackRed) return false

    return true
}

const blackWhiteDistance = () => {
    const black = { r: 0, g: 0, b: 0, a: 255}
    const white = { r: 255, g: 255, b: 255, a: 255}

    const distance = colorDistance(black, white)
    return distance === Math.sqrt(3)
}


const matchingTest = async() => {
    //aproximately half black, quarter black, etc
    const black = await imageDataFromURL('/400x400black.png')
    const halfBlack = await imageDataFromURL('/400x400blackAndWhite.png')
    const quarterBlack = await imageDataFromURL('/400x400quarterBlack.png')

    const halfMatch = matchValue(black, halfBlack)
    console.log('halfMatch: ' + halfMatch);
}


const testFuncs = [
    colorDistanceZeroForEqualColors, 
    positiveDistanceIfAlphaDiffers,
    expectedColorDistancesByEye,
    blackWhiteDistance,
    matchingTest
]

export const runTests = async() => {
   for (let i = 0; i < testFuncs.length; i++) {
       if (!testFuncs[i]()) {
            console.log('!!!!!!!TEST FAIL: ' + testFuncs[i].name);
       } else {
            console.log('TEST PASS: ' + testFuncs[i].name);
       }
   }
}