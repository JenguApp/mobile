import {RequestedItem} from './requested-item';
import {Asset} from '../asset';

describe('Test Requested Item Model', () => {

    it('Make sure that the requested item model is being built properly', () => {
        const model = new RequestedItem({
            id: 4,
            name: 'An Item',
            asset: {
                id: 235,
            },
        });

        expect(model).toBeTruthy();
        expect(model.asset.constructor).toBe(Asset);
    });
});
