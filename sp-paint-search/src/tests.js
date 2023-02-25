//own simple testing module

import {colorDistance, imageDataFromURL, averageColor} from './func/matching';


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