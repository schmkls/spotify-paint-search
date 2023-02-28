//own simple testing module

import {colorDistance, imageDataFromURL, getColorAt} from './func/matching';


const getColorAtTest = async() => {
    return new Promise(async(res, rej) => {

        for (let r = 0; r < 400; r++) {
            //black
            const url = 'https://upload.wikimedia.org/wikipedia/commons/7/71/Black.png?20110927180820'
            const expected = {r: 1, g: 0, b: 0}
            await getColorAtTestComp(url, r, expected)
            .catch((err) => {
                return rej(err)
            })
        }
        return res(true)
    })
}

const getColorAtTestComp = async(url, radius, expected) => {
    return new Promise(async(res, rej) => {

        const img = await imageDataFromURL(url, 400)
        const colorInMiddle = getColorAt(img, 200, 200, radius)
        const colorInTopLeft = getColorAt(img, 0, 0, radius)
        const colorInTopRight = getColorAt(img, 399, 0, radius)
        const colorInBottomLeft = getColorAt(img, 0, 399, radius)
        const colorInBottomRight = getColorAt(img, 399, 399, radius)
    
        if (colorInMiddle.r !== expected.r || colorInMiddle.g !== expected.g || colorInMiddle.b !== expected.b) {
            return rej([url, radius, expected, colorInMiddle, "middle"])
        }
        if (colorInTopLeft.r !== expected.r || colorInTopLeft.g !== expected.g || colorInTopLeft.b !== expected.b) {
            return rej([url, radius, expected, colorInTopLeft, "top left"])
        }
        if (colorInTopRight.r !== expected.r || colorInTopRight.g !== expected.g || colorInTopRight.b !== expected.b) {
            return rej([url, radius, expected, colorInTopRight, "top right"])
        }
        if (colorInBottomLeft.r !== expected.r || colorInBottomLeft.g !== expected.g || colorInBottomLeft.b !== expected.b) {
            return rej([url, radius, expected, colorInBottomLeft, "bottom left"])
        }
        if (colorInBottomRight.r !== expected.r || colorInBottomRight.g !== expected.g || colorInBottomRight.b !== expected.b) {
            return rej([url, radius, expected, colorInBottomRight, "bottom right"])
        }
        return res(true)
    })
}

const middleOfBlackWhiteIsGray = async() => {

}


const testFuncs = [
    getColorAtTest
]


export const runTests = async() => {
    for (let i = 0; i < testFuncs.length; i++) {
        await testFuncs[i]()
        .then((res) => {
            if (!res) {
                console.log('FAIL with: ' + testFuncs[i].name);
                return false    
            }
            console.log(testFuncs[i].name + ' PASS');
            return true
        })
        .catch((err) => {
            console.log('FAIL with error: ', err);
            return false
        })
    }
}