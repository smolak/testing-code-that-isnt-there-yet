import { expect } from 'chai';
import sinon from 'sinon';

import createHotelPhotosRouteHandler from '../../../src/createHotelPhotosRouteHandler';

describe('createHotelPhotosRouteHandler', () => {
    const collectionName = 'hotels';
    const hotelId = 'hotelId';

    const ctxDouble = {
        params: { // (1)
            hotelId
        },
        response: {
            status: 0,
            body: ''
        }
    };
    const findOneSpy = sinon.spy();
    const connectedClientDouble = {
        collection: sinon.stub().returns({ // (2)
            findOne: findOneSpy
        })
    };

    beforeEach(() => {
        connectedClientDouble.collection.resetHistory(); // (3)
        findOneSpy.reset();

        ctxDouble.response.status = 0;
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

        it('should find hotel entry by hotel id passed in params', () => {
            const routeHandler = createHotelPhotosRouteHandler(connectedClientDouble, collectionName);

            routeHandler(ctxDouble);

            expect(findOneSpy)
                .to.have.been.calledWithExactly({ hotelId: 'hotelId' })
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
