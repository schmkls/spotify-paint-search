


/**
 * albumsAndImages = [{id: 'id', image: 'imageUrl'}, ...] 
 */
export const orderByImageMatch = (albumsAndImages, imageData, detailLevel) => {
    //width and height of album image should match drawed image
    const widthAndHeight = Math.sqrt(imageData.data.length / 4 )
    let matches = []
    
    let matchVal
    let albumImageData
    for (let index in albumsAndImages) {
        albumImageData = imageDataFromURL(albumsAndImages[index].image, widthAndHeight)
        matchVal = matchValue(imageData, albumImageData, detailLevel, widthAndHeight)
        matches.push({album: albumsAndImages[index], match: matchVal})
    }
    console.log('matches: ' + JSON.stringify(matches));
    return matches
}


export const imageDataFromURL = (url) => {
    return new Promise((res, rej) => {
        var img = new Image();

        img.setAttribute('crossOrigin', 'anonymous');

        img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            console.log('width: ' + this.width);
            console.log('height: ' + this.height);

            var ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL();
            return res(imgData)
        };

        img.src = url;
    })
    
}


export const matchValue = (imageDataOne, imageDataTwo, detailLevel, widthAndHeight) => {
    let match = 0
    let pixelOne
    let pixelTwo
    
    for (let y = 0; y <  widthAndHeight; y++) {
        for (let x = 0; x < widthAndHeight; x++) {
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

    let aSum = c1.a + c2.a
    let rDiff = c1.a - c1.a
    let gDiff = c1.g - c2.g
    let bDiff = c1.b - c2.b
    
    return Math.max(Math.pow(rDiff, 2), Math.pow(rDiff - aSum, 2)) + 
        Math.max(Math.pow(gDiff, 2), Math.pow(gDiff - aSum, 2)) +
        Math.max(Math.pow(bDiff, 2), Math.pow(bDiff - aSum, 2))
}
    

export const premultiply = (color) => {
    return {
        r: color.r * color.a,
        g: color.g * color.a,
        b: color.b * color.a,
        a: color.a
    }
}

export const distance = (x1, y1, x2, y2, widthAndHeight) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) / widthAndHeight
}