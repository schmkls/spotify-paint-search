const canvas = document.createElement('canvas')
const ctx = canvas.getContext("2d");


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
        albumImageData = imageDataFromUrl(albumsAndImages[index].image, widthAndHeight)
        matchVal = matchValue(imageData, albumImageData)
        matches.push({album: albumsAndImages[index], match: matchVal})
    }
    return matches
}


export const imageDataFromUrl = (imageUrl, widthAndHeight) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;   
    ctx.drawImage(img, 0, 0)
    const imageData = ctx.getImageData(0, 0, widthAndHeight, widthAndHeight)
    return imageData
}


export const matchValue = (imageDataOne, imageDataTwo, detailLevel) => {
    let match = 0
    for (let i = 0; i < imageDataOne.data.length; i++) {
        if (imageDataOne.data[i] === imageDataTwo.data[i]) {
            match++
        }    
    }

    return match
}


export const getPixelAt = (imageData, x, y) => {
    const index = (x + y * imageData.width) * 4
    return {
        r: imageData.data[index + 0],
        g: imageData.data[index + 1],
        b: imageData.data[index + 2],
        a: imageData.data[index + 3]
    }
}


export const colorDistance = (colorOne, colorTwo) => {
    
}


export const distance = (x1, y1, x2, y2, widthAndHeight) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) / widthAndHeight
}