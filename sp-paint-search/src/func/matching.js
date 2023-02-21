const canvas = document.createElement('canvas')
const ctx = canvas.getContext("2d");


/**
 * albumsAndImages = [{id: 'id', image: 'imageUrl'}, ...] 
 */
export const orderByImageMatch = (albumsAndImages, imageData, detailLevel) => {
    console.log('drawed image data: ' + imageData + 'length: ' + imageData.data.length);
    let exampleImage = imageDataFromUrl(albumsAndImages[0].image, 400)
    console.log('example image: ' + exampleImage + 'length: ' + exampleImage.data.length);
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
            return false
        }
    }

    return true
}

