//own simple testing module

import {colorDistance, imageDataFromURL, getColorAt} from './func/matching';


const getColorAtTest = async() => {
    return new Promise(async(res, rej) => {

        for (let r = 1; r < 400; r++) {
            const blackUrl = 'https://upload.wikimedia.org/wikipedia/commons/7/71/Black.png?20110927180820'
            await getColorAtTestComp(blackUrl, r, {r: 0, g: 0, b: 0})
            .catch((err) => {
                return rej(err)
            })

            const whiteUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/1024px-Solid_white.svg.png'
            await getColorAtTestComp(whiteUrl, r, {r: 255, g: 255, b: 255})
            .catch((err) => {
                return rej(err)
            })

            const purpleUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Solid_purple.svg/512px-Solid_purple.svg.png?20150316143836'
            await getColorAtTestComp(purpleUrl, r, {r: 102, g: 0, b: 153})
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
    const img = await imageDataFromURL('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Chess_Board.svg/600px-Chess_Board.svg.png', 600)
    const clr = getColorAt(img, 300, 300, 100)
    console.log(clr);
    return Math.max(clr.r - 127, clr.g - 127, clr.b - 127) < 2
}


const testFuncs = [
    getColorAtTest, 
    middleOfBlackWhiteIsGray
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