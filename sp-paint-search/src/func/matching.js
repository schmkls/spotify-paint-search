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


export const matchValue = (imageDataOne, imageDataTwo) => {
    for (let i = 0; i < imageDataOne.data.length; i++) {
        if (imageDataOne.data[i] != imageDataTwo.data[i]) {
            return 32
        }
    }

    return 32
}

