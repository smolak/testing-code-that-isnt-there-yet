import { expect } from 'chai';
import sinon from 'sinon';

import fetchHotelPhotos from '../../../src/fetchHotelPhotos';

describe('fetchHotelPhotos', () => {
    const connectedClientDouble = {
        collection: sinon.spy()
    };
    const collectionName = 'hotels';

    it('should fetch hotels collection from DB', () => {
        fetchHotelPhotos(connectedClientDouble, collectionName);

        expect(connectedClientDouble.collection)
            .to.have.been.calledWithExactly('hotels') // (1)
            .to.have.been.calledOnce;
    });

    it('should return hotel photos collection', () => {
        const photosCollection = fetchHotelPhotos(connectedClientDouble, collectionName); // (2)

        expect(photosCollection).to.deep.equal([
            'photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg'
        ]);
    });
});
