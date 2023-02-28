


/**
 * albumsAndImages = [{id: 'id', image: 'imageUrl'}, ...] 
 */
export const orderByImageMatch = async(albumsAndImages, imageData, detailLevel) => {
    return new Promise(async(res, rej) => {
        let matches = []    
        let widthAndHeight = imageData.width
        
        let matchVal
        let albumImageData
        for (let index in albumsAndImages) {
            albumImageData = await imageDataFromURL(albumsAndImages[index].image, widthAndHeight)
            if (albumImageData.data.length !== imageData.data.length) {
                return rej('ImageDatas length mismatch')
            }

            matchVal = getSimilarity(imageData, albumImageData, detailLevel)
            matches.push({album: albumsAndImages[index], match: matchVal})
        }
        return res(matches)
    })
    
}


export const imageDataFromURL = (url, widthAndHeight) => {
    return new Promise((res, rej) => {
        var img = new Image();

        img.setAttribute('crossOrigin', 'anonymous');

        img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = widthAndHeight
            canvas.height = widthAndHeight
            var ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            return res(imgData)
        };

        img.src = url;
    }) 
}



/**
 * Returns a value representing similiarity between drawn image and 
 * image to match against. 
 * 
 * @param {*} drawnImgData drawn image data
 * @param {*} imgData image data to match against
 * @param {*} detailLevel 0-1, 0 being the most detailed
 * @returns 
 */
export const getSimilarity = (drawnImgData, imgData, detailLevel) => {
    let similarity = 0
    let width = Math.min(drawnImgData.width, imgData.width)
    let height = Math.min(drawnImgData.height, imgData.height)
    let radius = Math.min(width, height) * detailLevel
    console.log('detailLevel: ' + detailLevel)
    console.log('radius: ' + radius)

    let avgColor
    let drawedColor
    
    for (let y = radius / 2; y < height; y += radius) {
        for (let x = radius / 2; x < width; x += radius) {
            avgColor = getColorAt(imgData, x, y, radius)
            drawedColor = getColorAt(drawnImgData, x, y, radius)
            similarity += colorMatch(avgColor, drawedColor)
            console.log('average color at ' + x + ', ' + y + ': ' + JSON.stringify(avgColor))
        }
    }
    return similarity
}

export const getColorAt = (imgData, x, y, radius) => {
    let pixel
    let count = 0
    let r = 0
    let g = 0
    let b = 0
    radius = Math.max(1, radius)
    console.log('radius: ' + radius + '');

    for (let yPos = Math.max(0, y - radius); yPos < Math.min(imgData.height, y + radius); yPos++) {
        for (let xPos = Math.max(0, x - radius); xPos < Math.min(imgData.width, x + radius); xPos++) {
            console.log('xPos: ' + xPos + ', yPos: ' + yPos + '');
            pixel = getPixelColor(imgData, xPos, yPos)
            r += pixel.r
            g += pixel.g
            b += pixel.b
            count++
        }
    }

    console.log('count: ' + count + ', r: ' + r + ', g: ' + g + ', b: ' + b + '');

    return {
        r: r / count,
        g: g / count,
        b: b / count,
    }

}

export const getPixelColor = (imageData, x, y) => {
    const index = (x + y * imageData.width) * 4
    return {
        r: imageData.data[index + 0],
        g: imageData.data[index + 1],
        b: imageData.data[index + 2],
    }
}




//https://stackoverflow.com/questions/4754506/color-similarity-distance-in-rgba-color-space
export const colorMatch = (c1, c2) => {
    let rDiff = Math.pow(c1.r - c2.r, 2)
    let gDiff = Math.pow(c1.g - c2.g, 2)
    let bDiff = Math.pow(c1.b - c2.b, 2)

    let rSpec = 0.5 * (c1.r + c2.r)

    let diff = Math.sqrt((2 + rSpec / 256) * rDiff + 4 * gDiff + (2 + (255 - rSpec) / 256) * bDiff)
    
    return diff
}


export const distance = (x1, y1, x2, y2, widthAndHeight) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) / widthAndHeight
}