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

    const findOneStub = sinon.stub().resolves({ // (1)
        photos: [ 'photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg' ]
    });
    const connectedClientDouble = {
        collection: sinon.stub().returns({
            findOne: findOneStub
        })
    };

    beforeEach(() => {
        connectedClientDouble.collection.resetHistory();
        findOneStub.resetHistory();

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

            expect(findOneStub)
                .to.have.been.calledWithExactly({ hotelId: 'hotelId' })
                .to.have.been.calledOnce;
        });

        it('should return hotel photos collection', () => {
            const routeHandler = createHotelPhotosRouteHandler(connectedClientDouble, collectionName);

            return routeHandler(ctxDouble) // (2)
                .then(() => {
                    expect(ctxDouble.response.status).to.equal(200);
                    expect(ctxDouble.response.body).to.deep.equal([
                        'photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg'
                    ]);
                });
        });
    });
});
