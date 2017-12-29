import { expect } from 'chai';

import fetchHotelPhotos from '../../../src/fetchHotelPhotos';

describe('fetchHotelPhotos', () => {
    it('should return hotel photos collection', () => {
        const photosCollection = fetchHotelPhotos();

        expect(photosCollection).to.deep.equal([
            'photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg'
        ]);
    });
});
