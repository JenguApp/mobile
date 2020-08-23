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

    it('Make sure that getMaximumPossibleQuantity returns null when nether quantity fields are set.', () => {
        const model = new RequestedItem({});

        expect(model.getMaximumPossibleQuantity()).toBeNull();
    });

    it('Make sure that getMaximumPossibleQuantity returns the quantity when it is set.', () => {
        const model = new RequestedItem({
            quantity: 10,
        });

        expect(model.getMaximumPossibleQuantity()).toBe(10);
    });

    it('Make sure that getMaximumPossibleQuantity returns the max_quantity_per_request when it is set.', () => {
        const model = new RequestedItem({
            max_quantity_per_request: 2,
        });

        expect(model.getMaximumPossibleQuantity()).toBe(2);
    });

    it('Make sure that getMaximumPossibleQuantity returns the max_quantity_per_request when it is less than the quantity.', () => {
        const model = new RequestedItem({
            max_quantity_per_request: 2,
            quantity: 10,
        });

        expect(model.getMaximumPossibleQuantity()).toBe(2);
    });

    it('Make sure that getMaximumPossibleQuantity returns the quantity when it is less than the max_quantity_per_request.', () => {
        const model = new RequestedItem({
            max_quantity_per_request: 2,
            quantity: 1,
        });

        expect(model.getMaximumPossibleQuantity()).toBe(1);
    });
});
