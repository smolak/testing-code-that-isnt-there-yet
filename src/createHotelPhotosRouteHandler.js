export default function createHotelPhotosRouteHandler(dbClient, collectionName) {
    return (ctx) => {
        dbClient // (4)
            .collection(collectionName)
            .findOne({ hotelId: ctx.params.hotelId });

        ctx.response.status = 200;
        ctx.response.body = [ 'photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg' ];
    };
}
