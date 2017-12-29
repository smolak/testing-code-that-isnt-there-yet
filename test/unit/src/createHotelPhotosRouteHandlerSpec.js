import { expect } from 'chai';
import sinon from 'sinon';

import createHotelPhotosRouteHandler from '../../../src/createHotelPhotosRouteHandler';

describe('createHotelPhotosRouteHandler', () => {
    const collectionName = 'hotels';

    const connectedClientDouble = {
        collection: sinon.spy()
    };

    beforeEach(() => {
        connectedClientDouble.collection.reset(); // (1)
    });

    it('should return a route handler', () => {
        const routeHandler = createHotelPhotosRouteHandler(connectedClientDouble, collectionName);

        expect(routeHandler).to.be.a('function');
    });

    describe('route handler', () => {
        it('should fetch hotels collection from DB', () => {
            const routeHandler = createHotelPhotosRouteHandler(connectedClientDouble, collectionName);

            routeHandler();

            expect(connectedClientDouble.collection)
                .to.have.been.calledWithExactly('hotels')
                .to.have.been.calledOnce;
        });

        it('should return hotel photos collection', () => {
            const routeHandler = createHotelPhotosRouteHandler(connectedClientDouble, collectionName);
            const photosCollection = routeHandler(); // (2)

            expect(photosCollection).to.deep.equal([
                'photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg'
            ]);
        });
    });
});
