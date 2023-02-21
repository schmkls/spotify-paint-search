
/**
 * albumsAndImages = [{id: 'id', image: 'imageUrl'}, ...] 
 */
export const orderByImageMatch = (albumsAndImages, imageData, detailLevel) => {

}

export const imageDataFromUrl = (imageUrl, widthAndHeight) => {
    const img = new Image();
    img.src = imageUrl;
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext("2d");
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