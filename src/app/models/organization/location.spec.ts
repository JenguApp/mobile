import {Location} from './location';
import {Organization} from './organization';
import {RequestedItem} from '../request/requested-item';

describe('Test Location Model', () => {

    it('Make sure that the location model is being built properly', () => {
        const model = new Location({
            id: 4,
            name: 'A Location',
        });

        expect(model).toBeTruthy();
    });

    it('Make sure that the location model is being built properly with relationships', () => {
        const model = new Location({
            id: 4,
            name: 'A Location',
            organization: {
                id: 325,
                name: 'An Organization',
            },
            requested_items: [
                {
                    id: 5364,
                }
            ],
        });

        expect(model).toBeTruthy();
        expect(model.organization.constructor).toBe(Organization);
        expect(model.organization.id).toBe(325);
        expect(model.requested_items[0].constructor).toBe(RequestedItem);
        expect(model.requested_items[0].id).toBe(5364);
    });
});
