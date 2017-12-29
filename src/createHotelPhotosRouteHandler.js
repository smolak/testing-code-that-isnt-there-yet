export default function createHotelPhotosRouteHandler(dbClient, collectionName) {
    dbClient.collection(collectionName);

    return () => [ 'photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg' ];
}
