import { expect } from 'chai';
import sinon from 'sinon';

import createHotelPhotosRouteHandler from '../../../src/createHotelPhotosRouteHandler';

describe('createHotelPhotosRouteHandler', () => {
    const connectedClientDouble = {
        collection: sinon.spy()
    };
    const collectionName = 'hotels';

    it('should return a function', () => {
        const routeHandler = createHotelPhotosRouteHandler(connectedClientDouble, collectionName);

        expect(routeHandler).to.be.a('function'); // (1)
    });
});
