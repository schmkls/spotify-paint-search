export const spotifyIdFromUri = (uri) => {
    return uri.substring(uri.lastIndexOf(':') + 1);
}

export const spotifyIdFromLink = (link) => {
    let endIndex = link.length;
    if (link.includes('?')) {
        endIndex = link.indexOf('?');
    }
    return link.substring(link.lastIndexOf('/') + 1, endIndex);
}