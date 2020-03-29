import {LineItem} from './line-item';
import {Asset} from '../asset';

describe('Test Line Item Model', () => {

    it('Make sure that the membership plan model is being built properly', () => {
        const model = new LineItem({
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
