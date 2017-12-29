export default function fetchHotelPhotos(dbClient, collectionName) {
    dbClient.collection(collectionName); // (3)

    return [ 'photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg' ];
}
