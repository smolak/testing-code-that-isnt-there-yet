export default function createHotelPhotosRouteHandler(dbClient, collectionName) {
    return (ctx) => {
        return dbClient
            .collection(collectionName)
            .findOne({ hotelId: ctx.params.hotelId })
            .then((hotelEntity) => {
                if (hotelEntity) {
                    ctx.response.status = 200;
                    ctx.response.body = hotelEntity.photos;
                } else {
                    ctx.response.status = 404;
                }
            });
    };
}
