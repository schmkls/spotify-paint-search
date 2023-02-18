export const spotifyIdFromUri = (uri) => {
    return uri.substring(uri.lastIndexOf(':') + 1);
}