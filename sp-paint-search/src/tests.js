//own simple testing module

import {colorDistance, imageDataFromURL, averageColor} from './func/matching';

const colorDistanceIsZeroForEqualColors = () => {
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

const blackWhiteDistanceEqualsSpaceDiagonal = () => {
    const black = { r: 0, g: 0, b: 0, a: 255}
    const white = { r: 255, g: 255, b: 255, a: 255}

    const distance = colorDistance(black, white)
    return distance === Math.sqrt(3)
}

const blackImageAverageIsBlack = async() => {
    const black = await imageDataFromURL('https://upload.wikimedia.org/wikipedia/commons/7/71/Black.png?20110927180820', 400)
    const blackAverage = averageColor(black)
    if (blackAverage.r !== 0 && blackAverage.g !== 0 && blackAverage.b !== 0 && blackAverage.a !== 255) return false
    return true
}


const cowAverageColor = async() => {
    let img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cow_female_black_white.jpg/1280px-Cow_female_black_white.jpg'
    const cow = await imageDataFromURL(img, 200)
    const cowAverage = averageColor(cow)
    console.log('cow in field ' + img +  ' average color: ', cowAverage)
    return true
}

const jungleAverageColor = async() => {
    let img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Jungle.jpg/1280px-Jungle.jpg'
    const jungle = await imageDataFromURL(img, 200)
    const jungleAverage = averageColor(jungle)
    console.log('jungle ' + img +  ' average color: ', jungleAverage)
    return true
}


const testFuncs = [
    colorDistanceIsZeroForEqualColors, 
    positiveDistanceIfAlphaDiffers,
    expectedColorDistancesByEye,
    blackWhiteDistanceEqualsSpaceDiagonal, 
    blackImageAverageIsBlack, 
    cowAverageColor, 
    jungleAverageColor
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