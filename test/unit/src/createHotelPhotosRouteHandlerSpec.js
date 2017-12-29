import { expect } from 'chai';
import sinon from 'sinon';

import createHotelPhotosRouteHandler from '../../../src/createHotelPhotosRouteHandler';

describe('createHotelPhotosRouteHandler', () => {
    const collectionName = 'hotels';

    const connectedClientDouble = {
        collection: sinon.spy()
    };
    const ctxDouble = {
        response: { // (1)
            status: 0,
            body: ''
        }
    };

    beforeEach(() => {
        connectedClientDouble.collection.reset();

        ctxDouble.response.status = 0; // (2)
        ctxDouble.response.body = '';
    });

    it('should return a route handler', () => {
        const routeHandler = createHotelPhotosRouteHandler(connectedClientDouble, collectionName);

        expect(routeHandler).to.be.a('function');
    });

    describe('route handler', () => {
        it('should fetch hotels collection from DB', () => {
            const routeHandler = createHotelPhotosRouteHandler(connectedClientDouble, collectionName);

            routeHandler(ctxDouble);

            expect(connectedClientDouble.collection)
                .to.have.been.calledWithExactly('hotels')
                .to.have.been.calledOnce;
        });

        it('should return hotel photos collection', () => { // (3)
            const routeHandler = createHotelPhotosRouteHandler(connectedClientDouble, collectionName);

            routeHandler(ctxDouble); // (4)

            expect(ctxDouble.response.status).to.equal(200);
            expect(ctxDouble.response.body).to.deep.equal([
                'photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg'
            ]);
        });
    });
});
