//own simple testing module

import {imageDataFromURL, matchValue, getColorAt, colorDistance} from './func/matching';

const colorDistanceTest = () => {
    const colorOne = { r: 255, g: 255, b: 255, a: 255}

    const colorTwo = { r: 255, g: 255, b: 255, a: 255}

    const distance = colorDistance(colorOne, colorTwo)

    return distance === 0
}


const matchingTest = async() => {
    const black = await imageDataFromURL('/400x400black.png')
    const halfBlack = await imageDataFromURL('/400x400blackAndWhite.png')
    const quarterBlack = await imageDataFromURL('/400x400quarterBlack.png')


    const halfMatch = matchValue(black, halfBlack)
    console.log('halfMatch: ' + halfMatch);
}


const testFuncs = [colorDistanceTest, matchingTest]
export const runTests = async() => {
   for (let i = 0; i < testFuncs.length; i++) {
       if (!testFuncs[i]()) {
            console.log('!!!!!!!TEST FAIL: ' + testFuncs[i].name);
       } else {
            console.log('TEST PASS: ' + testFuncs[i].name);
       }
   }
}