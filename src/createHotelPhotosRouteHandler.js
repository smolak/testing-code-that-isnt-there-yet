export default function createHotelPhotosRouteHandler(dbClient, collectionName) {
    dbClient.collection(collectionName);

    return (ctx) => {
        ctx.response.status = 200;
        ctx.response.body = [ 'photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg' ];
    };
}
