


/**
 * albumsAndImages = [{id: 'id', image: 'imageUrl'}, ...] 
 */
export const orderByImageMatch = async(albumsAndImages, imageData, detailLevel) => {
    return new Promise(async(res, rej) => {
        let matches = []
    
        let matchVal
        let albumImageData
        for (let index in albumsAndImages) {
            albumImageData = await imageDataFromURL(albumsAndImages[index].image)
            matchVal = matchValue(imageData, albumImageData, detailLevel)
            matches.push({album: albumsAndImages[index], match: matchVal})
        }
        console.log('matches: ' + JSON.stringify(matches));
        return res(matches)
    })
    
}


export const imageDataFromURL = (url) => {
    return new Promise((res, rej) => {
        var img = new Image();

        img.setAttribute('crossOrigin', 'anonymous');

        img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            return res(imgData)
        };

        img.src = url;
    })
    
}


export const matchValue = (imageDataOne, imageDataTwo, detailLevel) => {
    let match = 0
    let pixelOne
    let pixelTwo
    let width = Math.min(imageDataOne.width, imageDataTwo.width)
    let height = Math.min(imageDataOne.height, imageDataTwo.height)
    
    for (let y = 0; y <  height; y++) {
        for (let x = 0; x < width; x++) {
            pixelOne = getColorAt(imageDataOne, x, y)
            pixelTwo = getColorAt(imageDataTwo, x, y)
            match += colorDistance(pixelOne, pixelTwo)
        }
    }
    return match
}


export const getColorAt = (imageData, x, y) => {
    const index = (x + y * imageData.width) * 4
    return {
        r: imageData.data[index + 0],
        g: imageData.data[index + 1],
        b: imageData.data[index + 2],
        a: imageData.data[index + 3]
    }
}


//https://stackoverflow.com/questions/4754506/color-similarity-distance-in-rgba-color-space
export const colorDistance = (colorOne, colorTwo) => {
    let c1 = premultiply(colorOne)
    let c2 = premultiply(colorTwo)

    let rDiff = c1.r - c2.r
    let gDiff = c1.g - c2.g
    let bDiff = c1.b - c2.b
    
    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff)
}
    

export const premultiply = (color) => {
    return {
        r: color.r / 255 * color.a / 255,
        g: color.g / 255 * color.a / 255,
        b: color.b / 255 * color.a / 255,
        a: color.a / 255
    }
}

export const distance = (x1, y1, x2, y2, widthAndHeight) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) / widthAndHeight
}